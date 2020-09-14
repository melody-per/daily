import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import home from '../components/home.vue'
import welcom from '../components/welcom.vue'
import users from '../components/users.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: login },
  { path: '/home', component: home, redirect: '/welcom', children: [{ path: '/welcom', component: welcom }, { path: '/users', component: users }] }
]

const router = new VueRouter({
  routes
})
// 前置守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    const isAuthenticated = sessionStorage.getItem('token')
    if (!isAuthenticated) {
      next('/login')
    } else {
      next()
    }
  }
})
export default router
