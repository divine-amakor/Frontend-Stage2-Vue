<template>
  <div class="tickets-page">
    <!-- Header -->
    <header class="header">
      <div class="container">
        <nav class="nav">
          <div class="logo">TicketFlow</div>
          <div class="nav-links">
            <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
            <router-link to="/tickets" class="nav-link active">Tickets</router-link>
            <button @click="handleLogout" class="btn btn-secondary">Logout</button>
          </div>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main">
      <div class="container">
        <!-- Page Header -->
        <div class="page-header">
          <h1>Ticket Management</h1>
          <button @click="showCreateModal = true" class="btn btn-primary">
            Create New Ticket
          </button>
        </div>

        <!-- Tickets List -->
        <div class="tickets-section">
          <div v-if="userTickets.length === 0" class="empty-state card">
            <div class="empty-icon">🎫</div>
            <h3>No tickets yet</h3>
            <p>Create your first ticket to get started</p>
            <button @click="showCreateModal = true" class="btn btn-primary">
              Create Ticket
            </button>
          </div>

          <div v-else class="tickets-grid">
            <div
              v-for="ticket in userTickets"
              :key="ticket.id"
              class="ticket-card card"
            >
              <div class="ticket-header">
                <h3>{{ ticket.title }}</h3>
                <span class="status-badge" :class="`status-${ticket.status}`">
                  {{ ticket.status.replace('_', ' ') }}
                </span>
              </div>

              <p v-if="ticket.description" class="ticket-description">
                {{ ticket.description }}
              </p>

              <div v-if="ticket.priority" class="ticket-priority">
                <span class="priority-label">Priority:</span>
                <span class="priority-badge" :class="`priority-${ticket.priority}`">
                  {{ ticket.priority }}
                </span>
              </div>

              <div class="ticket-meta">
                <span>Created: {{ formatDate(ticket.createdAt) }}</span>
                <span>Updated: {{ formatDate(ticket.updatedAt) }}</span>
              </div>

              <div class="ticket-actions">
                <button
                  @click="editTicket(ticket)"
                  class="btn btn-secondary btn-sm"
                >
                  Edit
                </button>
                <button
                  @click="confirmDelete(ticket)"
                  class="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal || showEditModal" class="modal-overlay" @click="closeModals">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h2>{{ showEditModal ? 'Edit Ticket' : 'Create New Ticket' }}</h2>
          <button @click="closeModals" class="modal-close">&times;</button>
        </div>

        <form @submit.prevent="handleSubmit" class="modal-form">
          <div class="form-group">
            <label for="title" class="form-label">Title *</label>
            <input
              id="title"
              v-model="form.title"
              type="text"
              class="form-input"
              :class="{ 'error': errors.title }"
              placeholder="Enter ticket title"
              required
            />
            <div v-if="errors.title" class="error-message">{{ errors.title }}</div>
          </div>

          <div class="form-group">
            <label for="description" class="form-label">Description</label>
            <textarea
              id="description"
              v-model="form.description"
              class="form-input"
              :class="{ 'error': errors.description }"
              placeholder="Enter ticket description"
              rows="4"
            ></textarea>
            <div v-if="errors.description" class="error-message">{{ errors.description }}</div>
          </div>

          <div class="form-group">
            <label for="status" class="form-label">Status *</label>
            <select
              id="status"
              v-model="form.status"
              class="form-input"
              :class="{ 'error': errors.status }"
              required
            >
              <option value="">Select status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            <div v-if="errors.status" class="error-message">{{ errors.status }}</div>
          </div>

          <div class="form-group">
            <label for="priority" class="form-label">Priority</label>
            <select
              id="priority"
              v-model="form.priority"
              class="form-input"
            >
              <option value="">Select priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div class="modal-actions">
            <button type="button" @click="closeModals" class="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary" :disabled="loading">
              {{ loading ? 'Saving...' : (showEditModal ? 'Update Ticket' : 'Create Ticket') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay" @click="showDeleteModal = false">
      <div class="modal modal-sm" @click.stop>
        <div class="modal-header">
          <h2>Confirm Delete</h2>
        </div>
        
        <div class="modal-body">
          <p>Are you sure you want to delete this ticket? This action cannot be undone.</p>
          <p><strong>{{ ticketToDelete?.title }}</strong></p>
        </div>

        <div class="modal-actions">
          <button @click="showDeleteModal = false" class="btn btn-secondary">
            Cancel
          </button>
          <button @click="handleDelete" class="btn btn-danger">
            Delete Ticket
          </button>
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
import { useTicketStore, type Ticket } from '../stores/tickets'

const router = useRouter()
const authStore = useAuthStore()
const ticketStore = useTicketStore()

const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const loading = ref(false)
const editingTicket = ref<Ticket | null>(null)
const ticketToDelete = ref<Ticket | null>(null)

const form = reactive({
  title: '',
  description: '',
  status: '',
  priority: ''
})

const errors = reactive({
  title: '',
  description: '',
  status: ''
})

const toast = reactive({
  show: false,
  message: '',
  type: 'success'
})

const userTickets = computed(() => {
  const userId = authStore.user?.id || ''
  return ticketStore.getUserTickets(userId)
})

const resetForm = () => {
  form.title = ''
  form.description = ''
  form.status = ''
  form.priority = ''
  errors.title = ''
  errors.description = ''
  errors.status = ''
}

const validateForm = () => {
  errors.title = ''
  errors.description = ''
  errors.status = ''

  if (!form.title.trim()) {
    errors.title = 'Title is required'
    return false
  }

  if (form.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters'
    return false
  }

  if (!form.status) {
    errors.status = 'Status is required'
    return false
  }

  if (!['open', 'in_progress', 'closed'].includes(form.status)) {
    errors.status = 'Invalid status selected'
    return false
  }

  if (form.description && form.description.length > 500) {
    errors.description = 'Description must be less than 500 characters'
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

const closeModals = () => {
  showCreateModal.value = false
  showEditModal.value = false
  editingTicket.value = null
  resetForm()
}

const editTicket = (ticket: Ticket) => {
  editingTicket.value = ticket
  form.title = ticket.title
  form.description = ticket.description || ''
  form.status = ticket.status
  form.priority = ticket.priority || ''
  showEditModal.value = true
}

const confirmDelete = (ticket: Ticket) => {
  ticketToDelete.value = ticket
  showDeleteModal.value = true
}

const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true

  try {
    if (showEditModal.value && editingTicket.value) {
      // Update existing ticket
      const updated = ticketStore.updateTicket(editingTicket.value.id, {
        title: form.title.trim(),
        description: form.description.trim() || undefined,
        status: form.status as 'open' | 'in_progress' | 'closed',
        priority: form.priority as 'low' | 'medium' | 'high' || undefined
      })

      if (updated) {
        showToast('Ticket updated successfully!', 'success')
        closeModals()
      } else {
        showToast('Failed to update ticket', 'error')
      }
    } else {
      // Create new ticket
      const userId = authStore.user?.id || ''
      const newTicket = ticketStore.createTicket(userId, {
        title: form.title.trim(),
        description: form.description.trim() || undefined,
        status: form.status as 'open' | 'in_progress' | 'closed',
        priority: form.priority as 'low' | 'medium' | 'high' || undefined
      })

      if (newTicket) {
        showToast('Ticket created successfully!', 'success')
        closeModals()
      } else {
        showToast('Failed to create ticket', 'error')
      }
    }
  } catch (error) {
    showToast('An error occurred. Please try again.', 'error')
  } finally {
    loading.value = false
  }
}

const handleDelete = () => {
  if (!ticketToDelete.value) return

  const success = ticketStore.deleteTicket(ticketToDelete.value.id)
  
  if (success) {
    showToast('Ticket deleted successfully!', 'success')
  } else {
    showToast('Failed to delete ticket', 'error')
  }

  showDeleteModal.value = false
  ticketToDelete.value = null
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
.tickets-page {
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

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: #6b7280;
  margin-bottom: 2rem;
}

.tickets-grid {
  display: grid;
  gap: 1.5rem;
}

.ticket-card {
  padding: 1.5rem;
  transition: transform 0.2s;
}

.ticket-card:hover {
  transform: translateY(-2px);
}

.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.ticket-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  flex: 1;
  margin-right: 1rem;
}

.ticket-description {
  color: #6b7280;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.ticket-priority {
  margin-bottom: 1rem;
}

.priority-label {
  font-size: 0.875rem;
  color: #6b7280;
  margin-right: 0.5rem;
}

.priority-badge {
  display: inline-block;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.priority-low {
  background: #dcfce7;
  color: #166534;
}

.priority-medium {
  background: #fef3c7;
  color: #92400e;
}

.priority-high {
  background: #fee2e2;
  color: #991b1b;
}

.ticket-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: #9ca3af;
  margin-bottom: 1rem;
}

.ticket-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal {
  background: white;
  border-radius: 0.75rem;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-sm {
  max-width: 400px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7280;
  cursor: pointer;
  padding: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  color: #374151;
}

.modal-form {
  padding: 1.5rem;
}

.modal-body {
  padding: 1.5rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.form-input.error {
  border-color: #ef4444;
}

.toast {
  position: fixed;
  top: 2rem;
  right: 2rem;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  color: white;
  font-weight: 600;
  z-index: 1100;
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
  
  .page-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .ticket-header {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .ticket-header h3 {
    margin-right: 0;
  }
  
  .ticket-meta {
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .modal {
    margin: 1rem;
  }
  
  .toast {
    left: 1rem;
    right: 1rem;
  }
}
</style>