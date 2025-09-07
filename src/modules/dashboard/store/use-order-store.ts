import { create } from "zustand";
import { get, set, del } from "idb-keyval";
import { persist, createJSONStorage } from "zustand/middleware";

import type { Order } from "@/modules/dashboard/data/order";
import { parseDateString } from "@/modules/dashboard/utils/format";
import type { SortConfig, FilterConfig } from "@/modules/dashboard/types/table";

// Custom IndexedDB storage adapter for Zustand
const idbStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const value = await get(name);
    return value || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

export interface OrdersState {
  // Data
  orders: Order[];

  // UI State
  searchTerm: string;
  currentPage: number;
  selectedOrders: string[];
  itemsPerPage: number;
  sortConfig: SortConfig;
  filterConfig: FilterConfig;

  // Actions
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  deleteOrder: (id: string) => void;
  deleteSelectedOrders: () => void;
  bulkUpdateStatus: (status: Order["status"]) => void;

  // UI Actions
  setSearchTerm: (term: string) => void;
  setCurrentPage: (page: number) => void;
  setSelectedOrders: (orders: string[]) => void;
  toggleOrderSelection: (orderId: string) => void;
  selectAllOrders: () => void;
  clearSelection: () => void;
  setSortConfig: (config: SortConfig) => void;
  setFilterConfig: (config: FilterConfig) => void;
  resetFilters: () => void;

  // Computed values
  getFilteredOrders: () => Order[];
  getPaginatedOrders: () => Order[];
  getTotalPages: () => number;
  getSelectedOrdersCount: () => number;
  getFilteredCount: () => number;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      // Initial state
      orders: [],
      searchTerm: "",
      currentPage: 1,
      selectedOrders: [],
      itemsPerPage: 10,
      sortConfig: { field: "date", direction: "desc" },
      filterConfig: { status: "all" },

      // Data actions
      setOrders: (orders) => set({ orders }),

      addOrder: (order) =>
        set((state) => ({
          orders: [...state.orders, order],
        })),

      updateOrder: (id, updates) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id ? { ...order, ...updates } : order
          ),
        })),

      deleteOrder: (id) =>
        set((state) => ({
          orders: state.orders.filter((order) => order.id !== id),
          selectedOrders: state.selectedOrders.filter(
            (orderId) => orderId !== id
          ),
        })),

      deleteSelectedOrders: () =>
        set((state) => ({
          orders: state.orders.filter(
            (order) => !state.selectedOrders.includes(order.id)
          ),
          selectedOrders: [],
        })),

      bulkUpdateStatus: (status) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            state.selectedOrders.includes(order.id)
              ? { ...order, status }
              : order
          ),
          selectedOrders: [],
        })),

      // UI actions
      setSearchTerm: (searchTerm) => set({ searchTerm, currentPage: 1 }),

      setCurrentPage: (currentPage) => set({ currentPage }),

      setSelectedOrders: (selectedOrders) => set({ selectedOrders }),

      toggleOrderSelection: (orderId) =>
        set((state) => ({
          selectedOrders: state.selectedOrders.includes(orderId)
            ? state.selectedOrders.filter((id) => id !== orderId)
            : [...state.selectedOrders, orderId],
        })),

      selectAllOrders: () =>
        set(() => {
          const filteredOrders = get().getFilteredOrders();
          const allFilteredIds = filteredOrders.map((order) => order.id);
          return { selectedOrders: allFilteredIds };
        }),

      clearSelection: () => set({ selectedOrders: [] }),

      setSortConfig: (sortConfig) => set({ sortConfig, currentPage: 1 }),

      setFilterConfig: (filterConfig) => set({ filterConfig, currentPage: 1 }),

      resetFilters: () =>
        set({
          searchTerm: "",
          filterConfig: { status: "all" },
          sortConfig: { field: "date", direction: "desc" },
          currentPage: 1,
        }),

      // Computed values
      getFilteredOrders: () => {
        const { orders, searchTerm, filterConfig, sortConfig } = get();

        // Apply search filter
        let filtered = orders;
        if (searchTerm) {
          filtered = orders.filter(
            (order) =>
              order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
              order.user.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              order.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
              order.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
              order.status.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        // Apply status filter
        if (filterConfig.status !== "all") {
          filtered = filtered.filter(
            (order) => order.status === filterConfig.status
          );
        }

        // Apply sorting
        filtered.sort((a, b) => {
          let aValue: string | number;
          let bValue: string | number;

          switch (sortConfig.field) {
            case "user.name":
              aValue = a.user.name.toLowerCase();
              bValue = b.user.name.toLowerCase();
              break;
            case "id":
              aValue = a.id.toLowerCase();
              bValue = b.id.toLowerCase();
              break;
            case "project":
              aValue = a.project.toLowerCase();
              bValue = b.project.toLowerCase();
              break;
            case "address":
              aValue = a.address.toLowerCase();
              bValue = b.address.toLowerCase();
              break;
            case "status":
              aValue = a.status.toLowerCase();
              bValue = b.status.toLowerCase();
              break;
            case "date":
              // Parse date strings for comparison
              aValue = parseDateString(a.date);
              bValue = parseDateString(b.date);
              break;
            default:
              return 0;
          }

          if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
          if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
          return 0;
        });

        return filtered;
      },

      getPaginatedOrders: () => {
        const { currentPage, itemsPerPage } = get();
        const filteredOrders = get().getFilteredOrders();
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredOrders.slice(startIndex, startIndex + itemsPerPage);
      },

      getTotalPages: () => {
        const { itemsPerPage } = get();
        const filteredOrders = get().getFilteredOrders();
        return Math.ceil(filteredOrders.length / itemsPerPage);
      },

      getSelectedOrdersCount: () => {
        return get().selectedOrders.length;
      },

      getFilteredCount: () => {
        return get().getFilteredOrders().length;
      },
    }),
    {
      name: "orders-store",
      storage: createJSONStorage(() => idbStorage),
      partialize: (state) => ({
        orders: state.orders,
        searchTerm: state.searchTerm,
        currentPage: state.currentPage,
        selectedOrders: state.selectedOrders,
        itemsPerPage: state.itemsPerPage,
        sortConfig: state.sortConfig,
        filterConfig: state.filterConfig,
      }),
    }
  )
);
