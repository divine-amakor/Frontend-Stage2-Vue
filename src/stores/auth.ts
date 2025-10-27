import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface User {
  id: string
  email: string
  name: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Mock authentication - accept any email/password for demo
    if (email && password) {
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0] || 'User'
      }
      
      user.value = mockUser
      isAuthenticated.value = true
      localStorage.setItem('ticketapp_session', JSON.stringify(mockUser))
      return true
    }
    
    return false
  }

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    if (name && email && password) {
      const mockUser: User = {
        id: '1',
        email,
        name
      }
      
      user.value = mockUser
      isAuthenticated.value = true
      localStorage.setItem('ticketapp_session', JSON.stringify(mockUser))
      return true
    }
    
    return false
  }

  const logout = () => {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('ticketapp_session')
  }

  const checkAuth = () => {
    const session = localStorage.getItem('ticketapp_session')
    if (session) {
      try {
        const userData = JSON.parse(session)
        user.value = userData
        isAuthenticated.value = true
      } catch {
        localStorage.removeItem('ticketapp_session')
      }
    }
  }

  return {
    user,
    isAuthenticated,
    login,
    signup,
    logout,
    checkAuth
  }
})