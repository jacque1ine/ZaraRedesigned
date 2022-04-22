import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import BrazilView from '@/views/BrazilView.vue'
import PanamaView from '@/views/PanamaView.vue'
import HawaiiView from '@/views/HawaiiView.vue'
import JamaicaView from '@/views/JamaicaView.vue'

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
    component: AboutView
  },
  {
    path: '/brazil',
    name: 'brazil',
    component: BrazilView
  },
  {
    path: '/panama',
    name: 'panama',
    component: PanamaView
  },
  {
    path: '/hawaii',
    name: 'hawaii',
    component: HawaiiView
  },

  {
    path: '/jamaica',
    name: 'jamaica',
    component: JamaicaView
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
