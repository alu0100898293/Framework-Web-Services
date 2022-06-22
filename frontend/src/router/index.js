import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Home
  },
  {
    path: '/detail',
    name: 'Detalles',
    component: () => import('../views/Detail.vue')
  },
  {
    path: '/add',
    name: 'Añadir',
    component: () => import('../views/Add.vue')
  },
  {
    path: '/execute',
    name: 'Ejecutar',
    component: () => import('../views/Execute.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
