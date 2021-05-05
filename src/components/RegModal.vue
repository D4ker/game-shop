<template>
  <div class="modal fade" id="regModal" tabindex="-1" aria-labelledby="regModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="authModalLabel">Регистрация</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="regUser()">
            <div class="mb-3">
              <label for="regInputLogin" class="form-label">Login</label>
              <input type="text" class="form-control" id="regInputLogin" aria-describedby="loginHelp"
                     v-model="reg.login">
            </div>
            <div class="mb-3">
              <label for="regInputPassword" class="form-label">Password</label>
              <input type="password" class="form-control" id="regInputPassword"
                     v-model="reg.password">
            </div>
            <div class="mb-3">
              <label for="regInputFirstName" class="form-label">First name</label>
              <input type="text" class="form-control" id="regInputFirstName"
                     v-model="reg.first_name">
            </div>
            <div class="mb-3">
              <label for="regInputLastName" class="form-label">Last name</label>
              <input type="text" class="form-control" id="regInputLastName"
                     v-model="reg.last_name">
            </div>
            <div class="mb-3">
              <label for="regInputPhone" class="form-label">Phone</label>
              <input type="text" class="form-control" id="regInputPhone"
                     v-model="reg.phone_number">
            </div>
            <div class="mb-3">
              <label for="regInputBirth" class="form-label">Birth</label>
              <input type="text" class="form-control" id="regInputBirth"
                     v-model="reg.birth">
            </div>
            <div class="mb-3">
              <label for="regInputBirth" class="form-label">Country</label>
              <select class="form-select" aria-label="Country select"
                      v-model="country_id">
                <option :value="country.id" v-for="country in countries" :key="country.id">{{country.name}}</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="regInputEmail" class="form-label">Email</label>
              <input type="email" class="form-control" id="regInputEmail" aria-describedby="emailHelp"
                     v-model="reg.email">
            </div>
            <div class="modal-footer d-flex justify-content-between">
              <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
              <div v-if="authVisible">
                <button type="button" class="btn btn-secondary" data-bs-target="#authModal"
                        data-bs-toggle="modal" data-bs-dismiss="modal">К авторизации ></button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {request, setCookie} from "@/lib";

export default {
  name: 'AuthModal',
  props: ['authVisible'],
  data() {
    return {
      reg: {
        login: '',
        password: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        birth: '',
        country_id: 1,
        email: '',
        cash: 0
      },
      countries: [],
      country_id: 1
    }
  },
  watch: {
    country_id(value) {
      this.reg.country_id = value;
    }
  },
  methods: {
    async regUser() {
      const {...user} = this.reg;
      const res = await request('/api/registration', 'POST', user);
      if (res.status === 200) {
        const token = await res.json();
        setCookie('token', token.token);
        location.reload();
      }
    }
  },
  async mounted() {
    const countries = await request('/api/select/countries');
    if (countries.status === 200) {
      this.countries = await countries.json();
    }
  }
}
</script>

<style scoped>

.btn {
  margin-top: 5px;
}

</style>