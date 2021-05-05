<template>
  <div class="modal fade" id="authModal" tabindex="-1" aria-labelledby="authModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="authModalLabel">Авторизация</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="authUser()">
            <div class="mb-3">
              <label for="authInputLogin" class="form-label">Login</label>
              <input type="text" class="form-control" id="authInputLogin" aria-describedby="loginHelp"
                     v-model="auth.login">
            </div>
            <div class="mb-3">
              <label for="authInputPassword" class="form-label">Password</label>
              <input type="password" class="form-control" id="authInputPassword"
                     v-model="auth.password">
            </div>
            <div class="modal-footer d-flex justify-content-between">
              <button type="submit" class="btn btn-primary">Войти</button>
              <div v-if="regVisible">
                <button type="button" class="btn btn-secondary" data-bs-target="#regModal"
                        data-bs-toggle="modal" data-bs-dismiss="modal">К регистрации ></button>
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
  props: ['regVisible'],
  data() {
    return {
      auth: {
        login: '',
        password: ''
      }
    }
  },
  methods: {
    async authUser() {
      const {...user} = this.auth;
      const res = await request('/api/login', 'POST', user);
      if (res.status === 200) {
        const token = await res.json();
        setCookie('token', token.token);
        location.reload();
      }
    }
  }
}
</script>

<style scoped>

</style>