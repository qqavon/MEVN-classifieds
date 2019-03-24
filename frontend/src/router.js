import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Search from './views/Search.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Add from './views/Add.vue'
import Account from './views/Account.vue'
import Classified from './views/Classified.vue'
import auth from './auth'

Vue.use(Router)

const router = new Router({
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

router.beforeEach((to, from, next) => {
  if(!auth.isToken() && ['login', 'register', 'search', 'classified', 'home'].some((v) => { return v == to.name })) {
    next()
  }
  else if(auth.isToken() && ['login', 'register', null].some((v) => { return v == to.name })) {
    router.replace({ name: 'home' })
  }
  else if(auth.isToken()) {
    next()
  }
  else {
    router.replace({ name: 'login' })
  }
})

export default router;