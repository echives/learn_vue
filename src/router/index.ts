import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import JSBridgeView from '../views/JSBridgeView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/jsbridge',
      name: 'jsbridge',
      component: JSBridgeView // () => import('@/views/JSBridgeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AboutView // () => import('@/views/AboutView.vue')
    }
  ]
})

export default router
