import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.3/7777/api'
})

Vue.use(VueAxios, axiosInstance)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
