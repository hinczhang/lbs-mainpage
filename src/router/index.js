import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/views/MainPage'
import Database from '@/views/Database'
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
    }
  ]
})
