import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
    path: '/adduser',
    name: 'adduser',
    component: () => import(/* webpackChunkName: "addcontactview" */ '@/views/AddUserView.vue')
  }, 
  {
    path: '/posts',
    name: 'posts',
    component: () => import(/* webpackChunkName: "addcontactview" */ '@/views/PostView.vue')
  }, 
  {
    path: '/user/:id',
    name: 'user.show',
    component: () => import ('@/views/AccountView.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
