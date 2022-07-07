import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import IntroView from '@/views/IntroView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'intro',
    component: IntroView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/favorite',
    name: 'favorite',
    component: () => import('@/views/FavorView.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})


router.beforeEach(async(to, from, next) => {
  let notAuthen = ['login', 'intro']
  if (!notAuthen.includes(to.name) && !localStorage.getItem('TOKEN')) {
    next( { name: 'login' } )
  } else {
    next()
  }
})

export default router
