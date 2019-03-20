import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios';
import { Service } from 'axios-middleware'
import auth from './auth'
import { EventBus } from './EventBus'

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.7:7777/api',
  headers: {
    'Authorization': localStorage.getItem('token')
  }
})

const service = new Service(axiosInstance)

service.register({
  onResponseError(error) {
    if(JSON.parse(error.response.data).isLogged == false) {
      EventBus.$emit('loggedOut')
      auth.removeUserToken()
      router.push({ name: 'login' })
    }

    return new Promise((resolve, reject) => {
      reject(error)
    })
  }
})

Vue.use(VueAxios, axiosInstance)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')