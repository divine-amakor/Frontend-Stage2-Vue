import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Ticket {
  id: string
  userId: string
  title: string
  description?: string
  status: 'open' | 'in_progress' | 'closed'
  priority?: 'low' | 'medium' | 'high'
  createdAt: string
  updatedAt: string
}

export const useTicketStore = defineStore('tickets', () => {
  const tickets = ref<Ticket[]>([])

  // Load tickets from localStorage on initialization
  const loadTickets = () => {
    const stored = localStorage.getItem('ticketapp_tickets')
    if (stored) {
      try {
        tickets.value = JSON.parse(stored)
      } catch {
        tickets.value = []
      }
    }
  }

  // Save tickets to localStorage
  const saveTickets = () => {
    localStorage.setItem('ticketapp_tickets', JSON.stringify(tickets.value))
  }

  // Initialize tickets
  loadTickets()

  const getUserTickets = (userId: string) => tickets.value.filter(t => t.userId === userId)
  
  const totalTickets = computed(() => (userId: string) => getUserTickets(userId).length)
  const openTickets = computed(() => (userId: string) => getUserTickets(userId).filter(t => t.status === 'open').length)
  const inProgressTickets = computed(() => (userId: string) => getUserTickets(userId).filter(t => t.status === 'in_progress').length)
  const closedTickets = computed(() => (userId: string) => getUserTickets(userId).filter(t => t.status === 'closed').length)

  const createTicket = (userId: string, ticketData: Omit<Ticket, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    const newTicket: Ticket = {
      ...ticketData,
      id: Date.now().toString(),
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    tickets.value.push(newTicket)
    saveTickets()
    return newTicket
  }

  const updateTicket = (id: string, updates: Partial<Omit<Ticket, 'id' | 'createdAt'>>) => {
    const index = tickets.value.findIndex(t => t.id === id)
    if (index !== -1) {
      const currentTicket = tickets.value[index]!
      const updatedTicket: Ticket = {
        id: currentTicket.id,
        userId: currentTicket.userId,
        title: updates.title ?? currentTicket.title,
        description: updates.description ?? currentTicket.description,
        status: updates.status ?? currentTicket.status,
        priority: updates.priority ?? currentTicket.priority,
        createdAt: currentTicket.createdAt,
        updatedAt: new Date().toISOString()
      }
      tickets.value[index] = updatedTicket
      saveTickets()
      return updatedTicket
    }
    return null
  }

  const deleteTicket = (id: string) => {
    const index = tickets.value.findIndex(t => t.id === id)
    if (index !== -1) {
      tickets.value.splice(index, 1)
      saveTickets()
      return true
    }
    return false
  }

  const getTicketById = (id: string) => {
    return tickets.value.find(t => t.id === id)
  }

  return {
    tickets,
    getUserTickets,
    totalTickets,
    openTickets,
    inProgressTickets,
    closedTickets,
    createTicket,
    updateTicket,
    deleteTicket,
    getTicketById
  }
})