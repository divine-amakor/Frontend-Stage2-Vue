import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import DashboardView from '../views/DashboardView.vue'
import TicketsView from '../views/TicketsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
    },
    {
      path: '/auth/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/auth/signup',
      name: 'signup',
      component: SignupView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    {
      path: '/tickets',
      name: 'tickets',
      component: TicketsView,
      meta: { requiresAuth: true }
    },
  ],
})

// Navigation guard for protected routes
router.beforeEach((to) => {
  const session = localStorage.getItem('ticketapp_session')
  
  if (to.meta.requiresAuth && !session) {
    return { name: 'login' }
  }
  
  if ((to.name === 'login' || to.name === 'signup') && session) {
    return { name: 'dashboard' }
  }
})

export default router
