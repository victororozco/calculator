import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'User',
      component: Login
    }
  ]
})
