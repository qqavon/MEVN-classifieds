<template>
  <div id="app" class="light-theme">
    <nav>
      <router-link to="/">
        <div class="nav-link">
          <i class="fas fa-home"></i>
          <span class="nav-link-text">Strona główna</span>
        </div>
      </router-link>
      
      <router-link to="/search">
        <div class="nav-link">
          <i class="fas fa-search"></i>
          <span class="nav-link-text">Szukaj</span>
        </div>
      </router-link>

      <router-link v-if="logged" to="/add">
        <div class="nav-link">
          <i class="fas fa-plus"></i>
          <span class="nav-link-text">Dodaj ogłoszenie</span>
        </div>
      </router-link>

      <div class="nav-link" @click="toggleAccountDropdown()">
        <i class="fas fa-user"></i>
        <span class="nav-link-text">Konto</span>

        <div v-if="!logged" class="nav-account-dropdown">
          <router-link to="/login"> Login </router-link>
          <router-link to="/register"> Register </router-link>
        </div>

        <div v-else class="nav-account-dropdown">
          <router-link to="/account"> Konto </router-link>
          <span @click="logout"> Wyloguj </span>
        </div>
      </div>
    </nav>

    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view @auth="auth" />
      </keep-alive>
    </transition>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Muli');
@import url('assets/transitions.css');

body {
  margin: 0;
}

* {
  font-family: 'Muli', sans-serif;
  text-decoration: none;
}

.light-theme * {
  color: #111;
}
.light-theme nav {
  background-color: #fff;
}

#app {
  overflow: hidden;
}

nav {
  position: sticky;
  display: grid;
  grid-template-columns: repeat(auto-fit, 50px);
  align-items: center;
  justify-items: center;
  justify-content: right;
  /* overflow: hidden; */

  top: 0;
  left: 0;
  padding: 7px 0;

  border-bottom: solid #ccc 2px;
  background-color: #fff;
  z-index: 10;
}
.nav-link > .nav-link-text {
  display: none;
}
.nav-link > i {
  font-size: 1.5em;
}
.nav-account-dropdown {
  position: absolute;
  display: grid;
  grid-gap: 1.5em;
  padding: .5em .75em;
  width: 120px;
  background-color: #222;
  text-align: left;

  right: 0;
  bottom: 0;
  transition: all .5s;
  transform: translateY(100%) translateX(100%);
  z-index: 9;
}
.nav-account-dropdown[class~="active"] {
  transform: translateY(100%) translateX(0);
}
.nav-account-dropdown > * {
  color: white;
}
</style>

<script>
import auth from './auth.js'
import Vue from 'vue'

export default {
  data() {
    return {
      activeAccountDropdown: false,
      logged: false
    }
  },
  methods: {
    toggleAccountDropdown(value) {
      document
        .querySelector('.nav-account-dropdown')
        .classList.toggle('active')
    },
    auth(status) {
      this.logged = status
    },
    logout() {
      this.logged = false
      auth.removeUserToken()
      Vue.axios.defaults.headers.Authorization = ''
      this.$router.replace('login')
    }
  },
  created() {
    this.logged = auth.isToken()
  }
}
</script>
