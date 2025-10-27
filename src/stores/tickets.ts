import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Ticket {
  id: string
  title: string
  description?: string
  status: 'open' | 'in_progress' | 'closed'
  priority?: 'low' | 'medium' | 'high'
  createdAt: string
  updatedAt: string
}

export const useTicketStore = defineStore('tickets', () => {
  const tickets = ref<Ticket[]>([
    {
      id: '1',
      title: 'Fix login bug',
      description: 'Users cannot login with special characters in password',
      status: 'open',
      priority: 'high',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Update documentation',
      description: 'API documentation needs to be updated',
      status: 'in_progress',
      priority: 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ])

  const totalTickets = computed(() => tickets.value.length)
  const openTickets = computed(() => tickets.value.filter(t => t.status === 'open').length)
  const inProgressTickets = computed(() => tickets.value.filter(t => t.status === 'in_progress').length)
  const closedTickets = computed(() => tickets.value.filter(t => t.status === 'closed').length)

  const createTicket = (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTicket: Ticket = {
      ...ticketData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    tickets.value.push(newTicket)
    return newTicket
  }

  const updateTicket = (id: string, updates: Partial<Omit<Ticket, 'id' | 'createdAt'>>) => {
    const index = tickets.value.findIndex(t => t.id === id)
    if (index !== -1) {
      const currentTicket = tickets.value[index]!
      const updatedTicket: Ticket = {
        id: currentTicket.id,
        title: updates.title ?? currentTicket.title,
        description: updates.description ?? currentTicket.description,
        status: updates.status ?? currentTicket.status,
        priority: updates.priority ?? currentTicket.priority,
        createdAt: currentTicket.createdAt,
        updatedAt: new Date().toISOString()
      }
      tickets.value[index] = updatedTicket
      return updatedTicket
    }
    return null
  }

  const deleteTicket = (id: string) => {
    const index = tickets.value.findIndex(t => t.id === id)
    if (index !== -1) {
      tickets.value.splice(index, 1)
      return true
    }
    return false
  }

  const getTicketById = (id: string) => {
    return tickets.value.find(t => t.id === id)
  }

  return {
    tickets,
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