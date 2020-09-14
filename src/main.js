import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
// 配置请求的基准URL地址
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// axios设置请求拦截器
axios.interceptors.request.use(config => {
  // 设置响应头
  config.headers.Authorization = sessionStorage.getItem('token')
  return config
}, err => {
  console.log(err)
  return Promise.reject(err)
})

// 将axios挂载到Vue的原型上
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
