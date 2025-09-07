import { useEffect, useState, useCallback, memo } from "react";
import { X, Search, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Plus, ArrowsDownUp, FunnelSimple } from "phosphor-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationContent,
  PaginationEllipsis,
} from "@/components/ui/pagination";

import { orders } from "@/modules/dashboard/data/order";
import type { Order } from "@/modules/dashboard/data/order";
import type { DeleteTarget } from "@/modules/dashboard/types/table";
import { useOrdersStore } from "@/modules/dashboard/store/use-order-store";
import { OrderForm } from "@/modules/dashboard/components/table/order-form";
import { OrderTable } from "@/modules/dashboard/components/table/order-table";
import { DeleteDialog } from "@/modules/dashboard/components/table/delete-dialog";

export const OrderList = memo(() => {
  const {
    searchTerm,
    currentPage,
    selectedOrders,
    setSearchTerm,
    setCurrentPage,
    toggleOrderSelection,
    selectAllOrders,
    clearSelection,
    getPaginatedOrders,
    getTotalPages,
    getSelectedOrdersCount,
    setOrders,
    addOrder,
    deleteOrder,
    deleteSelectedOrders,
  } = useOrdersStore();

  // Dialog states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);

  // UI interaction states
  const [hoveredOrderId, setHoveredOrderId] = useState<string | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Initialize orders from data file on component mount
  useEffect(() => {
    if (useOrdersStore.getState().orders.length === 0) {
      setOrders(orders);
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
    if (
      selectedCount === paginatedOrders.length &&
      paginatedOrders.length > 0
    ) {
      clearSelection();
    } else {
      selectAllOrders();
    }
  }, [selectedCount, paginatedOrders.length, clearSelection, selectAllOrders]);

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
      deleteOrder(deleteTarget.orderId);
    } else if (deleteTarget?.type === "multiple") {
      deleteSelectedOrders();
    }
    setDeleteDialogOpen(false);
    setDeleteTarget(null);
  }, [deleteTarget, deleteOrder, deleteSelectedOrders]);

  const handleAddOrder = useCallback(() => {
    setAddDialogOpen(true);
  }, []);

  const handleOrderSubmit = useCallback(
    (newOrder: Order) => {
      addOrder(newOrder);
    },
    [addOrder]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
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
              <Button variant="ghost" size="icon">
                <FunnelSimple size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <ArrowsDownUp size={20} />
              </Button>

              {selectedCount > 0 && (
                <Button
                  size="sm"
                  variant="destructive"
                  className="text-white"
                  onClick={handleDeleteSelected}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Selected ({selectedCount})
                </Button>
              )}
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
            openDropdownId={openDropdownId}
            onSelectOrder={handleSelectOrder}
            onSelectAll={handleSelectAll}
            onDeleteOrder={handleDeleteOrder}
            onHoverOrder={setHoveredOrderId}
            onDropdownChange={setOpenDropdownId}
          />

          {totalPages > 1 && paginatedOrders.length > 0 && (
            <div className="mt-2 w-full p-2">
              <Pagination>
                <PaginationContent className="flex w-full items-center justify-end">
                  <PaginationItem>
                    <Button
                      size="icon"
                      variant="ghost"
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                      onClick={handlePreviousPage}
                    >
                      <ChevronLeft size={20} />
                    </Button>
                  </PaginationItem>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNumber = i + 1;
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          onClick={() => handlePageChange(pageNumber)}
                          isActive={currentPage === pageNumber}
                          className="cursor-pointer"
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  {totalPages > 5 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  <PaginationItem>
                    <Button
                      size="icon"
                      variant="ghost"
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                      onClick={handleNextPage}
                    >
                      <ChevronRight size={20} />
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
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
