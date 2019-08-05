import Vue from 'vue'
import Router from 'vue-router'
import ReviewEvaluate from './views/ReviewEvaluate.vue'
import ReviewHistory from './views/ReviewHistory.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: ReviewEvaluate
    },
    {
      path: '/history',
      name: 'history',
      component: ReviewHistory
    }
  ]
})
