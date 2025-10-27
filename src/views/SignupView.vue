<template>
  <div class="auth-page">
    <div class="container">
      <div class="auth-container">
        <div class="auth-card card">
          <div class="auth-header">
            <router-link to="/" class="logo">TicketFlow</router-link>
            <h1>Create Account</h1>
            <p>Join us and start managing your tickets efficiently</p>
          </div>

          <form @submit.prevent="handleSignup" class="auth-form">
            <div class="form-group">
              <label for="name" class="form-label">Full Name</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                class="form-input"
                :class="{ 'error': errors.name }"
                placeholder="Enter your full name"
                required
              />
              <div v-if="errors.name" class="error-message">{{ errors.name }}</div>
            </div>

            <div class="form-group">
              <label for="email" class="form-label">Email Address</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="form-input"
                :class="{ 'error': errors.email }"
                placeholder="Enter your email"
                required
              />
              <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
            </div>

            <div class="form-group">
              <label for="password" class="form-label">Password</label>
              <input
                id="password"
                v-model="form.password"
                type="password"
                class="form-input"
                :class="{ 'error': errors.password }"
                placeholder="Create a password"
                required
              />
              <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
            </div>

            <div class="form-group">
              <label for="confirmPassword" class="form-label">Confirm Password</label>
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                type="password"
                class="form-input"
                :class="{ 'error': errors.confirmPassword }"
                placeholder="Confirm your password"
                required
              />
              <div v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</div>
            </div>

            <button
              type="submit"
              class="btn btn-primary btn-full"
              :disabled="loading"
            >
              {{ loading ? 'Creating Account...' : 'Create Account' }}
            </button>

            <div v-if="errors.general" class="error-message text-center">
              {{ errors.general }}
            </div>
          </form>

          <div class="auth-footer">
            <p>Already have an account? 
              <router-link to="/auth/login" class="auth-link">Sign in</router-link>
            </p>
          </div>
        </div>

        <div class="auth-info">
          <h2>Get Started Today</h2>
          <p>Join thousands of teams already using TicketFlow to streamline their support process.</p>
          
          <div class="features-list">
            <div class="feature-item">
              <span class="feature-icon">✓</span>
              <span>Unlimited tickets</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">✓</span>
              <span>Real-time updates</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">✓</span>
              <span>Team collaboration</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div v-if="toast.show" class="toast" :class="toast.type">
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const errors = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  general: ''
})

const toast = reactive({
  show: false,
  message: '',
  type: 'success'
})

const loading = ref(false)

const validateForm = () => {
  errors.name = ''
  errors.email = ''
  errors.password = ''
  errors.confirmPassword = ''
  errors.general = ''

  if (!form.name.trim()) {
    errors.name = 'Full name is required'
    return false
  }

  if (form.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
    return false
  }

  if (!form.email) {
    errors.email = 'Email is required'
    return false
  }

  if (!form.email.includes('@')) {
    errors.email = 'Please enter a valid email address'
    return false
  }

  if (!form.password) {
    errors.password = 'Password is required'
    return false
  }

  if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
    return false
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password'
    return false
  }

  if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
    return false
  }

  return true
}

const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  toast.message = message
  toast.type = type
  toast.show = true
  
  setTimeout(() => {
    toast.show = false
  }, 3000)
}

const handleSignup = async () => {
  if (!validateForm()) return

  loading.value = true

  try {
    const success = await authStore.signup(form.name, form.email, form.password)
    
    if (success) {
      showToast('Account created successfully! Redirecting...', 'success')
      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)
    } else {
      errors.general = 'Failed to create account. Please try again.'
      showToast('Failed to create account. Please try again.', 'error')
    }
  } catch (error) {
    errors.general = 'An error occurred. Please try again.'
    showToast('An error occurred. Please try again.', 'error')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  padding: 2rem 0;
}

.auth-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
}

.auth-card {
  padding: 2.5rem;
  background: white;
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-header .logo {
  display: inline-block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #3b82f6;
  text-decoration: none;
  margin-bottom: 1rem;
}

.auth-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.auth-header p {
  color: #6b7280;
}

.auth-form {
  margin-bottom: 2rem;
}

.form-input.error {
  border-color: #ef4444;
}

.btn-full {
  width: 100%;
}

.auth-footer {
  text-align: center;
}

.auth-link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 600;
}

.auth-link:hover {
  text-decoration: underline;
}

.auth-info {
  color: white;
  text-align: center;
}

.auth-info h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.features-list {
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.feature-item:last-child {
  margin-bottom: 0;
}

.feature-icon {
  background: #10b981;
  color: white;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
}

.toast {
  position: fixed;
  top: 2rem;
  right: 2rem;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  color: white;
  font-weight: 600;
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
}

.toast.success {
  background: #10b981;
}

.toast.error {
  background: #ef4444;
}

.text-center {
  text-align: center;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .auth-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .auth-card {
    padding: 2rem;
  }
  
  .toast {
    left: 1rem;
    right: 1rem;
  }
}
</style>