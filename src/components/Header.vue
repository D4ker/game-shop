<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">D4ker GameShop</router-link>>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/">Главная</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">О нас</router-link>
            </li>
          </ul>
          <form class="d-flex find-block">
            <input class="form-control me-2" type="search" placeholder="Поиск" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Поиск</button>
          </form>
          <div v-if="!authorised">
            <button class="btn btn-profile nav-link" type="button" aria-expanded="false"
                    data-bs-toggle="modal" data-bs-target="#authModal">Регистрация/Вход</button>
            <AuthModal
                v-bind:regVisible="true"
            />
            <RegModal
                v-bind:authVisible="true"
            />
          </div>
          <div class="nav-item dropdown"
               v-if="authorised">
            <button class="btn btn-profile nav-link dropdown-toggle" type="button"
                    data-bs-toggle="dropdown" aria-expanded="false">Профиль</button>
            <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
              <li><router-link class="dropdown-item" to="/settings">Настройки</router-link></li>
              <li><router-link class="dropdown-item" to="/library">Библиотека</router-link></li>
              <li><router-link class="dropdown-item" to="/wishlist">Список желаемого</router-link></li>
              <li><router-link class="dropdown-item" to="/friends">Друзья</router-link></li>
              <li><hr class="dropdown-divider"></li>
              <li @click.prevent="logout()"><router-link class="dropdown-item" to="/">Выход</router-link></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import {deleteCookie, request} from '@/frontend'
import AuthModal from "@/components/AuthModal";
import RegModal from "@/components/RegModal";

export default {
  name: 'Header',
  components: {
    AuthModal,
    RegModal
  },
  data() {
    return {
      authorised: false
    }
  },
  methods: {
    logout() {
      deleteCookie('token');
      location.reload();
    }
  },
  async mounted() {
    let res = await request('/api/check/token');
    if (res.status === 200) {
      this.authorised = true;
    }
  }
}

</script>

<style scoped>
.dropdown-menu-right {
  right: 0;
  left: auto;
}

.find-block {
  margin-right: 10px;
}

.btn-profile {
  font-weight: 500;
  color: #ffe484;
  border-color: #ffe484;
}

.btn-profile:hover, .btn-profile:active {
  color: #2a2730;
  background-color: #ffe484;
  border-color: #ffe484;
}

.btn-profile:focus {
  box-shadow: 0 0 0 0.25rem rgb(255, 228, 132, .5);
}
</style>