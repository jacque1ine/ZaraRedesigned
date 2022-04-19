import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/addcontact',
    name: 'addcontact',
    component: () => import(/* webpackChunkName: "addcontactview" */ '@/views/AddContactView.vue')
  }, 
  {
    path: '/contact/:id',
    name: 'contact',
    component: () => import(/* webpackChunkName: "contactview" */ '@/views/ContactView.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
