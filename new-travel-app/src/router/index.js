import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'


//if we want to get to source folder, we use @ symbol. 
//the @ symbol takes us to the src folder 


//these are the different pages 
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import ('@/views/AboutView.vue')
  },
  // {
  //   path: '/brazil',
  //   name: 'brazil',
  //   component: () => import ('@/views/BrazilView.vue')
  // },
  // {
  //   path: '/panama',
  //   name: 'panama',
  //   component: () => import ('@/views/PanamaView.vue')
  // },
  // {
  //   path: '/hawaii',
  //   name: 'hawaii',
  //   component: () => import ('@/views/HawaiiView.vue')
  // },

  // {
  //   path: '/jamaica',
  //   name: 'jamaica',
  //   component: () => import ('@/views/JamaicaView.vue')
  // }, 
  
  {
    path: '/destination/:id',
    name: 'destination.show',
    component: () => import ('@/views/DestinationView.vue')
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

//lazy loading doesn't load something until you need it the first time. 
//so when u first load the page, not everything is loading at the same 

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
