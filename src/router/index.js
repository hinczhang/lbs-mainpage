import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/views/MainPage'
import Database from '@/views/Database'
import Login from '@/views/Login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'lbs project',
      component: MainPage
    },
    {
      path: '/MainPage',
      name: 'lbs project',
      component: MainPage
    },
    {
      path: '/database',
      name: 'Database PostgreSQL',
      component: Database
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
