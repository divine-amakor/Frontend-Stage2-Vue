<template>
  <div class="dashboard">
    <!-- Header -->
    <header class="header">
      <div class="container">
        <nav class="nav">
          <div class="logo">TicketFlow</div>
          <div class="nav-links">
            <router-link to="/dashboard" class="nav-link active">Dashboard</router-link>
            <router-link to="/tickets" class="nav-link">Tickets</router-link>
            <button @click="handleLogout" class="btn btn-secondary">Logout</button>
          </div>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main">
      <div class="container">
        <!-- Welcome Section -->
        <div class="welcome-section">
          <div class="decorative-circle circle-1"></div>
          <h1>Welcome back, {{ authStore.user?.name }}!</h1>
          <p>Here's an overview of your ticket management system</p>
        </div>

        <!-- Stats Grid -->
        <div class="stats-grid">
          <div class="stat-card card">
            <div class="stat-icon total">📊</div>
            <div class="stat-content">
              <h3>Total Tickets</h3>
              <div class="stat-number">{{ ticketStore.totalTickets }}</div>
            </div>
          </div>

          <div class="stat-card card">
            <div class="stat-icon open">🟢</div>
            <div class="stat-content">
              <h3>Open Tickets</h3>
              <div class="stat-number">{{ ticketStore.openTickets }}</div>
            </div>
          </div>

          <div class="stat-card card">
            <div class="stat-icon progress">🟡</div>
            <div class="stat-content">
              <h3>In Progress</h3>
              <div class="stat-number">{{ ticketStore.inProgressTickets }}</div>
            </div>
          </div>

          <div class="stat-card card">
            <div class="stat-icon closed">⚫</div>
            <div class="stat-content">
              <h3>Closed Tickets</h3>
              <div class="stat-number">{{ ticketStore.closedTickets }}</div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="quick-actions">
          <div class="decorative-circle circle-2"></div>
          <h2>Quick Actions</h2>
          <div class="actions-grid">
            <router-link to="/tickets" class="action-card card">
              <div class="action-icon">🎫</div>
              <h3>Manage Tickets</h3>
              <p>View, create, edit, and delete tickets</p>
            </router-link>

            <div class="action-card card">
              <div class="action-icon">📈</div>
              <h3>View Reports</h3>
              <p>Analyze ticket trends and performance</p>
            </div>

            <div class="action-card card">
              <div class="action-icon">⚙️</div>
              <h3>Settings</h3>
              <p>Configure your account and preferences</p>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="recent-activity">
          <h2>Recent Tickets</h2>
          <div class="tickets-preview">
            <div v-if="recentTickets.length === 0" class="empty-state">
              <p>No tickets yet. <router-link to="/tickets">Create your first ticket</router-link></p>
            </div>
            
            <div v-else class="tickets-list">
              <div
                v-for="ticket in recentTickets"
                :key="ticket.id"
                class="ticket-preview card"
              >
                <div class="ticket-header">
                  <h4>{{ ticket.title }}</h4>
                  <span class="status-badge" :class="`status-${ticket.status}`">
                    {{ ticket.status.replace('_', ' ') }}
                  </span>
                </div>
                <p v-if="ticket.description" class="ticket-description">
                  {{ ticket.description.substring(0, 100) }}{{ ticket.description.length > 100 ? '...' : '' }}
                </p>
                <div class="ticket-meta">
                  <span>Created: {{ formatDate(ticket.createdAt) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Toast Notification -->
    <div v-if="toast.show" class="toast" :class="toast.type">
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useTicketStore } from '../stores/tickets'

const router = useRouter()
const authStore = useAuthStore()
const ticketStore = useTicketStore()

const toast = reactive({
  show: false,
  message: '',
  type: 'success'
})

const recentTickets = computed(() => {
  return ticketStore.tickets.slice(0, 3)
})

const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  toast.message = message
  toast.type = type
  toast.show = true
  
  setTimeout(() => {
    toast.show = false
  }, 3000)
}

const handleLogout = () => {
  authStore.logout()
  showToast('Logged out successfully', 'success')
  setTimeout(() => {
    router.push('/')
  }, 1000)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background: #f8fafc;
}

.header {
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #3b82f6;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-link {
  text-decoration: none;
  color: #6b7280;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: all 0.2s;
}

.nav-link:hover,
.nav-link.active {
  color: #3b82f6;
  background: #eff6ff;
}

.main {
  padding: 2rem 0;
}

.welcome-section {
  position: relative;
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 1rem;
  overflow: hidden;
}

.decorative-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.circle-1 {
  width: 150px;
  height: 150px;
  top: -75px;
  right: -75px;
}

.circle-2 {
  width: 100px;
  height: 100px;
  top: -50px;
  left: -50px;
}

.welcome-section h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.welcome-section p {
  font-size: 1.125rem;
  opacity: 0.9;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-icon {
  font-size: 2.5rem;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
}

.stat-icon.total {
  background: #eff6ff;
}

.stat-icon.open {
  background: #dcfce7;
}

.stat-icon.progress {
  background: #fef3c7;
}

.stat-icon.closed {
  background: #f3f4f6;
}

.stat-content h3 {
  font-size: 0.875rem;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
}

.quick-actions {
  position: relative;
  margin-bottom: 3rem;
}

.quick-actions h2 {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.action-card {
  padding: 1.5rem;
  text-align: center;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s;
}

.action-card:hover {
  transform: translateY(-5px);
}

.action-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.action-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.action-card p {
  color: #6b7280;
}

.recent-activity h2 {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
}

.empty-state a {
  color: #3b82f6;
  text-decoration: none;
}

.tickets-list {
  display: grid;
  gap: 1rem;
}

.ticket-preview {
  padding: 1.5rem;
}

.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.ticket-header h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.ticket-description {
  color: #6b7280;
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

.ticket-meta {
  font-size: 0.875rem;
  color: #9ca3af;
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
  .nav {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .welcome-section h1 {
    font-size: 2rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .actions-grid {
    grid-template-columns: 1fr;
  }
  
  .toast {
    left: 1rem;
    right: 1rem;
  }
}
</style>