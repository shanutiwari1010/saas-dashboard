import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { get, set, del } from 'idb-keyval'
import type { Order } from '../data/order'

// Custom IndexedDB storage adapter for Zustand
const idbStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const value = await get(name)
    return value || null
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await set(name, value)
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name)
  },
}

interface OrdersState {
  // Data
  orders: Order[]
  
  // UI State
  searchTerm: string
  currentPage: number
  selectedOrders: string[]
  itemsPerPage: number
  
  // Actions
  setOrders: (orders: Order[]) => void
  addOrder: (order: Order) => void
  updateOrder: (id: string, updates: Partial<Order>) => void
  deleteOrder: (id: string) => void
  deleteSelectedOrders: () => void
  
  // UI Actions
  setSearchTerm: (term: string) => void
  setCurrentPage: (page: number) => void
  setSelectedOrders: (orders: string[]) => void
  toggleOrderSelection: (orderId: string) => void
  selectAllOrders: () => void
  clearSelection: () => void
  
  // Computed values
  getFilteredOrders: () => Order[]
  getPaginatedOrders: () => Order[]
  getTotalPages: () => number
  getSelectedOrdersCount: () => number
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      // Initial state
      orders: [],
      searchTerm: '',
      currentPage: 1,
      selectedOrders: [],
      itemsPerPage: 10,

      // Data actions
      setOrders: (orders) => set({ orders }),
      
      addOrder: (order) => set((state) => ({
        orders: [...state.orders, order]
      })),
      
      updateOrder: (id, updates) => set((state) => ({
        orders: state.orders.map(order => 
          order.id === id ? { ...order, ...updates } : order
        )
      })),
      
      deleteOrder: (id) => set((state) => ({
        orders: state.orders.filter(order => order.id !== id),
        selectedOrders: state.selectedOrders.filter(orderId => orderId !== id)
      })),
      
      deleteSelectedOrders: () => set((state) => ({
        orders: state.orders.filter(order => !state.selectedOrders.includes(order.id)),
        selectedOrders: []
      })),

      // UI actions
      setSearchTerm: (searchTerm) => set({ searchTerm, currentPage: 1 }),
      
      setCurrentPage: (currentPage) => set({ currentPage }),
      
      setSelectedOrders: (selectedOrders) => set({ selectedOrders }),
      
      toggleOrderSelection: (orderId) => set((state) => ({
        selectedOrders: state.selectedOrders.includes(orderId)
          ? state.selectedOrders.filter(id => id !== orderId)
          : [...state.selectedOrders, orderId]
      })),
      
      selectAllOrders: () => set(() => {
        const filteredOrders = get().getFilteredOrders()
        const allFilteredIds = filteredOrders.map(order => order.id)
        return { selectedOrders: allFilteredIds }
      }),
      
      clearSelection: () => set({ selectedOrders: [] }),

      // Computed values
      getFilteredOrders: () => {
        const { orders, searchTerm } = get()
        if (!searchTerm) return orders
        
        return orders.filter(order =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.status.toLowerCase().includes(searchTerm.toLowerCase())
        )
      },
      
      getPaginatedOrders: () => {
        const { currentPage, itemsPerPage } = get()
        const filteredOrders = get().getFilteredOrders()
        const startIndex = (currentPage - 1) * itemsPerPage
        return filteredOrders.slice(startIndex, startIndex + itemsPerPage)
      },
      
      getTotalPages: () => {
        const { itemsPerPage } = get()
        const filteredOrders = get().getFilteredOrders()
        return Math.ceil(filteredOrders.length / itemsPerPage)
      },
      
      getSelectedOrdersCount: () => {
        return get().selectedOrders.length
      }
    }),
    {
      name: 'orders-store',
      storage: createJSONStorage(() => idbStorage),
      partialize: (state) => ({
        orders: state.orders,
        searchTerm: state.searchTerm,
        currentPage: state.currentPage,
        selectedOrders: state.selectedOrders,
        itemsPerPage: state.itemsPerPage,
      }),
    }
  )
)