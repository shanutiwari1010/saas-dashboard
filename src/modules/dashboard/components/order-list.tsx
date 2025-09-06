
import { useEffect, useState } from "react";
import { Search, X, Trash2, Edit, MoreHorizontal } from "lucide-react";
import {
  Plus,
  ArrowsDownUp,
  FunnelSimple,
  CaretLeft,
  CaretRight,
  CalendarBlank,
} from "phosphor-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { orders } from "../data/order";
import { useOrdersStore } from "../store/use-order-store";
import type { Order } from "../data/order";
import { z } from "zod";

const statusColors = {
  "In Progress": "text-[var(--status-in-progress)]",
  Complete: "text-[var(--status-complete)]",
  Pending: "text-[var(--status-pending)]",
  Approved: "text-[var(--status-approved)]",
  Rejected: "text-[var(--status-rejected)]",
};

const statusDotColors = {
  "In Progress": "bg-[var(--status-dot-in-progress)]",
  Complete: "bg-[var(--status-dot-complete)]",
  Pending: "bg-[var(--status-dot-pending)]",
  Approved: "bg-[var(--status-dot-approved)]",
  Rejected: "bg-[var(--status-dot-rejected)]",
};

// Zod validation schema
const orderFormSchema = z.object({
  userName: z
    .string()
    .min(1, "User name is required")
    .min(2, "User name must be at least 2 characters")
    .max(50, "User name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "User name can only contain letters and spaces"),
  project: z
    .string()
    .min(1, "Project name is required")
    .min(2, "Project name must be at least 2 characters")
    .max(100, "Project name must be less than 100 characters"),
  address: z
    .string()
    .min(1, "Address is required")
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address must be less than 200 characters"),
  status: z.enum([
    "Pending",
    "In Progress",
    "Complete",
    "Approved",
    "Rejected",
  ]),
  avatar: z.string().optional(),
});

type OrderFormData = z.infer<typeof orderFormSchema>;

// Avatar component with initials fallback
const UserAvatar = ({
  name,
  avatar,
  size = "h-8 w-8",
}: {
  name: string;
  avatar?: string;
  size?: string;
}) => {
  const initials = name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (avatar) {
    return (
      <img
        src={avatar}
        alt={name}
        className={`${size} rounded-full object-cover`}
      />
    );
  }

  return (
    <div
      className={`${size} flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-semibold text-white`}
    >
      {initials}
    </div>
  );
};

export default function OrderList() {
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

  // Alert dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    type: "single" | "multiple";
    orderId?: string;
    count?: number;
  } | null>(null);

  // Add order dialog state
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState<OrderFormData>({
    userName: "",
    project: "",
    address: "",
    status: "Pending",
    avatar: "",
  });
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof OrderFormData, string>>
  >({});

  // Hover state for action buttons
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

  const handleSelectOrder = (orderId: string) => {
    toggleOrderSelection(orderId);
  };

  const handleSelectAll = () => {
    if (
      selectedCount === paginatedOrders.length &&
      paginatedOrders.length > 0
    ) {
      clearSelection();
    } else {
      selectAllOrders();
    }
  };

  const handleDeleteOrder = (orderId: string) => {
    setDeleteTarget({ type: "single", orderId });
    setDeleteDialogOpen(true);
  };

  const handleDeleteSelected = () => {
    if (selectedCount > 0) {
      setDeleteTarget({ type: "multiple", count: selectedCount });
      setDeleteDialogOpen(true);
    }
  };

  const confirmDelete = () => {
    if (deleteTarget?.type === "single" && deleteTarget.orderId) {
      deleteOrder(deleteTarget.orderId);
    } else if (deleteTarget?.type === "multiple") {
      deleteSelectedOrders();
    }
    setDeleteDialogOpen(false);
    setDeleteTarget(null);
  };

  const handleAddOrder = () => {
    setAddDialogOpen(true);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData({ ...formData, avatar: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = () => {
    // Clear previous errors
    setFormErrors({});

    // Validate form data
    const validationResult = orderFormSchema.safeParse(formData);

    if (!validationResult.success) {
      const errors: Partial<Record<keyof OrderFormData, string>> = {};
      validationResult.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          errors[issue.path[0] as keyof OrderFormData] = issue.message;
        }
      });
      setFormErrors(errors);
      return;
    }

    const newOrder: Order = {
      id: `#CM${Date.now()}`,
      user: {
        name: formData.userName,
        avatar: formData.avatar || "",
      },
      project: formData.project,
      address: formData.address,
      date: "Just now",
      status: formData.status,
    };

    addOrder(newOrder);
    setAddDialogOpen(false);
    setFormData({
      userName: "",
      project: "",
      address: "",
      status: "Pending",
      avatar: "",
    });
    setFormErrors({});
  };

  const handleFormCancel = () => {
    setAddDialogOpen(false);
    setFormData({
      userName: "",
      project: "",
      address: "",
      status: "Pending",
      avatar: "",
    });
    setFormErrors({});
  };

  const clearFieldError = (field: keyof OrderFormData) => {
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="heading">Order List</CardTitle>
            <div className="flex items-center gap-2"></div>
          </div>
          <div className="mt-4 flex justify-between rounded-md bg-gray-50 p-2">
            <div className="flex cursor-pointer items-center gap-2 px-3">
              <Button variant="ghost" size={"icon"} onClick={handleAddOrder}>
                <Plus size={20} />
              </Button>
              <Button variant="ghost" size={"icon"}>
                <FunnelSimple size={20} />
              </Button>
              <Button variant="ghost" size={"icon"}>
                <ArrowsDownUp size={20} />
              </Button>

              {selectedCount > 0 && (
                <Button
                  onClick={handleDeleteSelected}
                  variant="destructive"
                  size="sm"
                  className="text-white"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Selected ({selectedCount})
                </Button>
              )}
            </div>
            <div className="relative px-1">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-black/20" />
              <Input
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-52 pr-10 pl-8 text-3xl text-gray-400 placeholder:text-black/20 focus:bg-white focus:text-gray-900 focus:ring-0"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 transition-colors hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      className="border-black/40 shadow-none"
                      checked={
                        selectedCount === paginatedOrders.length &&
                        paginatedOrders.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="font-light text-black/40">
                    Order ID
                  </TableHead>
                  <TableHead className="font-light text-black/40">
                    User
                  </TableHead>
                  <TableHead className="font-light text-black/40">
                    Project
                  </TableHead>
                  <TableHead className="font-light text-black/40">
                    Address
                  </TableHead>
                  <TableHead className="font-light text-black/40">
                    Date
                  </TableHead>
                  <TableHead className="font-light text-black/40">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-32">
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <h3 className="mb-2 text-lg font-medium text-gray-900">
                          No orders found
                        </h3>
                        <p className="max-w-sm text-gray-500">
                          {searchTerm
                            ? `No orders match "${searchTerm}". Try adjusting your search terms.`
                            : "No orders available at the moment."}
                        </p>
                        {searchTerm && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-4 bg-transparent"
                            onClick={() => {
                              setSearchTerm("");
                              setCurrentPage(1);
                            }}
                          >
                            Clear search
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedOrders.map((order) => {
                    const isSelected = selectedOrders.includes(order.id);
                    const isHovered = hoveredOrderId === order.id;
                    const isDropdownOpen = openDropdownId === order.id;
                    const showActions =
                      isSelected || isHovered || isDropdownOpen;

                    return (
                      <TableRow
                        key={order.id}
                        className="hover:bg-gray-50"
                        onMouseEnter={() => setHoveredOrderId(order.id)}
                        onMouseLeave={() => {
                          // Only clear hover if dropdown is not open
                          if (!isDropdownOpen) {
                            setHoveredOrderId(null);
                          }
                        }}
                      >
                        <TableCell>
                          <Checkbox
                            className="border-black/40 shadow-none"
                            checked={isSelected}
                            onCheckedChange={() => handleSelectOrder(order.id)}
                          />
                        </TableCell>
                        <TableCell className="font-light">{order.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <UserAvatar
                              name={order.user.name}
                              avatar={order.user.avatar}
                            />
                            <span className="font-light">
                              {order.user.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-light">
                          {order.project}
                        </TableCell>
                        <TableCell className="font-light">
                          {order.address}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 font-light">
                            <CalendarBlank size={24} />
                            {order.date}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={"outline"}
                            className={`border-0 bg-transparent font-light shadow-none ${statusColors[order.status]}`}
                          >
                            <span
                              className={`mr-2 h-2 w-2 rounded-full ${statusDotColors[order.status]}`}
                            ></span>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center">
                            {showActions ? (
                              <DropdownMenu
                                open={isDropdownOpen}
                                onOpenChange={(open) => {
                                  setOpenDropdownId(open ? order.id : null);
                                  if (!open) {
                                    // Clear hover state when dropdown closes
                                    setHoveredOrderId(null);
                                  }
                                }}
                              >
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      handleDeleteOrder(order.id);
                                      setOpenDropdownId(null);
                                    }}
                                    className="text-red-600 focus:text-red-600"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            ) : (
                              <div className="h-8 w-8" /> // Placeholder to maintain consistent spacing
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && paginatedOrders.length > 0 && (
            <div className="mt-2 w-full p-2">
              <Pagination>
                <PaginationContent className="flex w-full items-center justify-end">
                  <PaginationItem>
                    <CaretLeft
                      size={24}
                      onClick={() =>
                        setCurrentPage(Math.max(currentPage - 1, 1))
                      }
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNumber = i + 1;
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          onClick={() => setCurrentPage(pageNumber)}
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
                    <CaretRight
                      size={24}
                      onClick={() =>
                        setCurrentPage(Math.min(currentPage + 1, totalPages))
                      }
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete Order{deleteTarget?.type === "multiple" ? "s" : ""}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget?.type === "single"
                ? "Are you sure you want to delete this order? This action cannot be undone."
                : `Are you sure you want to delete ${deleteTarget?.count} selected order(s)? This action cannot be undone.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add Order Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Order</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new order.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-4">
              <Label htmlFor="userName">User Name *</Label>
              <Input
                id="userName"
                value={formData.userName}
                onChange={(e) => {
                  setFormData({ ...formData, userName: e.target.value });
                  clearFieldError("userName");
                }}
                className={
                  formErrors.userName
                    ? "border-red-500 focus:border-red-500"
                    : ""
                }
                placeholder="Enter user name"
              />
              {formErrors.userName && (
                <p className="text-sm text-red-500">{formErrors.userName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="avatar">Avatar</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <UserAvatar
                      name={formData.userName || "User"}
                      avatar={formData.avatar}
                      size="h-12 w-12"
                    />
                    {formData.avatar && (
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, avatar: "" })}
                        className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white hover:bg-red-600"
                      >
                        ×
                      </button>
                    )}
                  </div>
                  <div className="flex-1">
                    <Input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="cursor-pointer pb-3 file:mr-4 file:rounded-full file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Upload a profile picture (optional)
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="project">Project *</Label>
              <Input
                id="project"
                value={formData.project}
                onChange={(e) => {
                  setFormData({ ...formData, project: e.target.value });
                  clearFieldError("project");
                }}
                className={
                  formErrors.project
                    ? "border-red-500 focus:border-red-500"
                    : ""
                }
                placeholder="Enter project name"
              />
              {formErrors.project && (
                <p className="text-sm text-red-500">{formErrors.project}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => {
                  setFormData({ ...formData, address: e.target.value });
                  clearFieldError("address");
                }}
                className={
                  formErrors.address
                    ? "border-red-500 focus:border-red-500"
                    : ""
                }
                placeholder="Enter address"
                rows={3}
              />
              {formErrors.address && (
                <p className="text-sm text-red-500">{formErrors.address}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: Order["status"]) => {
                  setFormData({ ...formData, status: value });
                  clearFieldError("status");
                }}
              >
                <SelectTrigger
                  className={
                    formErrors.status
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Complete">Complete</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              {formErrors.status && (
                <p className="text-sm text-red-500">{formErrors.status}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleFormCancel}>
              Cancel
            </Button>
            <Button onClick={handleFormSubmit}>Add Order</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}