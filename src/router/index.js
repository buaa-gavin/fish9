import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/favorite',
    name: 'favorite',
    component: () => import('@/views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})


router.beforeEach(async(to, from, next) => {
  if (to.name !== 'login' && !localStorage.getItem('TOKEN')) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
