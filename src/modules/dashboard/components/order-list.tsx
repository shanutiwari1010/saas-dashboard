import { Plus } from "phosphor-react";
import { X, Search } from "lucide-react";
import { useEffect, useState, useCallback, memo } from "react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { Order } from "@/modules/dashboard/data/order";
import type { DeleteTarget } from "@/modules/dashboard/types/table";

import { orders as initialOrders } from "@/modules/dashboard/data/order";
import { useOrdersStore } from "@/modules/dashboard/store/use-order-store";
import { OrderForm } from "@/modules/dashboard/components/table/order-form";
import { OrderTable } from "@/modules/dashboard/components/table/order-table";
import { BulkActions } from "@/modules/dashboard/components/table/bulk-actions";
import { DeleteDialog } from "@/modules/dashboard/components/table/delete-dialog";
import { SortDropdown } from "@/modules/dashboard/components/table/sort-dropdown";
import { FilterDropdown } from "@/modules/dashboard/components/table/filter-dropdown";
import { TablePagination } from "@/modules/dashboard/components/table/table-pagination";

export const OrderList = memo(() => {
  const {
    orders,
    searchTerm,
    currentPage,
    selectedOrders,
    sortConfig,
    filterConfig,
    setSearchTerm,
    setCurrentPage,
    toggleOrderSelection,
    selectAllOrders,
    clearSelection,
    getPaginatedOrders,
    getTotalPages,
    getSelectedOrdersCount,
    getFilteredCount,
    setOrders,
    addOrder,
    deleteOrder,
    deleteSelectedOrders,
    bulkUpdateStatus,
    setSortConfig,
    setFilterConfig,
    resetFilters,
  } = useOrdersStore();

  // Dialog states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);

  // UI interaction states
  const [hoveredOrderId, setHoveredOrderId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize orders from data file on component mount
  useEffect(() => {
    if (useOrdersStore.getState().orders.length === 0) {
      setOrders(initialOrders);
    }
  }, [setOrders]);

  const paginatedOrders = getPaginatedOrders();
  const totalPages = getTotalPages();
  const selectedCount = getSelectedOrdersCount();

  // Event handlers
  const handleSelectOrder = useCallback(
    (orderId: string) => {
      toggleOrderSelection(orderId);
    },
    [toggleOrderSelection]
  );

  const handleSelectAll = useCallback(() => {
    const filteredCount = getFilteredCount();
    if (selectedCount === filteredCount && filteredCount > 0) {
      clearSelection();
    } else {
      selectAllOrders();
    }
  }, [selectedCount, getFilteredCount, clearSelection, selectAllOrders]);

  const handleDeleteOrder = useCallback((orderId: string) => {
    setDeleteTarget({ type: "single", orderId });
    setDeleteDialogOpen(true);
  }, []);

  const handleDeleteSelected = useCallback(() => {
    if (selectedCount > 0) {
      setDeleteTarget({ type: "multiple", count: selectedCount });
      setDeleteDialogOpen(true);
    }
  }, [selectedCount]);

  const confirmDelete = useCallback(() => {
    if (deleteTarget?.type === "single" && deleteTarget.orderId) {
      // Find the order to get its details for the toast
      const orderToDelete = orders.find(
        (order) => order.id === deleteTarget.orderId
      );
      deleteOrder(deleteTarget.orderId);

      toast.success("Order Deleted", {
        description: `Order ${orderToDelete?.id || deleteTarget.orderId} has been successfully deleted.`,
        duration: 4000,
      });
    } else if (deleteTarget?.type === "multiple") {
      const deletedCount = selectedCount;
      deleteSelectedOrders();

      toast.success("Orders Deleted", {
        description: `${deletedCount} order${deletedCount > 1 ? "s" : ""} have been successfully deleted.`,
        duration: 4000,
      });
    }
    setDeleteDialogOpen(false);
    setDeleteTarget(null);
  }, [deleteTarget, deleteOrder, deleteSelectedOrders, orders, selectedCount]);

  const handleAddOrder = useCallback(() => {
    setAddDialogOpen(true);
  }, []);

  const handleOrderSubmit = useCallback(
    (newOrder: Order) => {
      addOrder(newOrder);

      toast.success("Order Added", {
        description: `Order ${newOrder.id} has been successfully added to the list.`,
        duration: 4000,
      });
    },
    [addOrder]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      // Simulate loading delay for better UX
    },
    [setSearchTerm]
  );

  const clearSearch = useCallback(() => {
    setSearchTerm("");
  }, [setSearchTerm]);

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

  const handlePreviousPage = useCallback(() => {
    setCurrentPage(Math.max(currentPage - 1, 1));
  }, [currentPage, setCurrentPage]);

  const handleNextPage = useCallback(() => {
    setCurrentPage(Math.min(currentPage + 1, totalPages));
  }, [currentPage, totalPages, setCurrentPage]);

  const handleBulkUpdateStatus = useCallback(
    (status: Order["status"]) => {
      const updatedCount = selectedCount;
      bulkUpdateStatus(status);

      toast.success("Status Updated", {
        description: `${updatedCount} order${updatedCount > 1 ? "s" : ""} status updated to "${status}".`,
        duration: 4000,
      });
    },
    [bulkUpdateStatus, selectedCount]
  );

  const handleSortChange = useCallback(
    (config: typeof sortConfig) => {
      setSortConfig(config);
    },
    [setSortConfig]
  );

  const handleFilterChange = useCallback(
    (config: typeof filterConfig) => {
      setFilterConfig(config);
    },
    [setFilterConfig]
  );

  const handleResetFilters = useCallback(() => {
    setIsLoading(true);
    resetFilters();
    setTimeout(() => setIsLoading(false), 2000); // Intention: Skeleton loading time is 2 seconds
  }, [resetFilters]);

  const handleClearSelection = useCallback(() => {
    clearSelection();
  }, [clearSelection]);

  return (
    <>
      <Card className="w-full border-none bg-transparent shadow-none">
        <CardHeader className="space-y-4 p-0 pb-4">
          <CardTitle className="heading">Order List</CardTitle>
          <div className="bg-dashboard-revenue flex justify-between rounded-md p-2">
            <div className="flex cursor-pointer items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handleAddOrder}>
                <Plus size={20} />
              </Button>
              <FilterDropdown
                filterConfig={filterConfig}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
                filteredCount={getFilteredCount()}
                totalCount={orders.length}
              />
              <SortDropdown
                sortConfig={sortConfig}
                onSortChange={handleSortChange}
              />
              <BulkActions
                selectedCount={selectedCount}
                onDeleteSelected={handleDeleteSelected}
                onBulkUpdateStatus={handleBulkUpdateStatus}
                onClearSelection={handleClearSelection}
              />
            </div>
            <div className="relative px-1">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-black/20 dark:text-white/20" />
              <Input
                value={searchTerm}
                placeholder="Search"
                onChange={handleSearchChange}
                className="w-52 pr-10 pl-8 font-normal text-black/20 focus:bg-white focus:ring-0 dark:text-white/20 dark:focus:bg-black/40"
              />
              {searchTerm && (
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={clearSearch}
                  className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 transform rounded-full text-gray-400 transition-colors placeholder:text-black/20 [&_svg]:size-3"
                >
                  <X className="h-2 w-2" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <OrderTable
            orders={paginatedOrders}
            selectedOrders={selectedOrders}
            hoveredOrderId={hoveredOrderId}
            filteredOrdersCount={getFilteredCount()}
            isLoading={isLoading}
            onSelectOrder={handleSelectOrder}
            onSelectAll={handleSelectAll}
            onDeleteOrder={handleDeleteOrder}
            onHoverOrder={setHoveredOrderId}
          />

          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onPrevious={handlePreviousPage}
            onNext={handleNextPage}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        deleteTarget={deleteTarget}
        onConfirm={confirmDelete}
      />

      <OrderForm
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSubmit={handleOrderSubmit}
      />
    </>
  );
});

OrderList.displayName = "OrderList";
