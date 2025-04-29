import { createRouter, createWebHistory } from 'vue-router'
import PaymentView from '@/views/PaymentView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: PaymentView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router