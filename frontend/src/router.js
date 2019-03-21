import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Search from './views/Search.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Add from './views/Add.vue'
import Account from './views/Account.vue'
import Classified from './views/Classified.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/add',
      name: 'add',
      component: Add
    },
    {
      path: '/account',
      name: 'account',
      component: Account
    },
    {
      path: '/classified/:id',
      name: 'classified',
      component: Classified
    }
  ]
})
