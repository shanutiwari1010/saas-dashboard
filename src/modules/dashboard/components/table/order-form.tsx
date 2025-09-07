import { memo, useState, useCallback } from "react";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";

import {
  orderFormSchema,
  type OrderFormData,
} from "@/modules/dashboard/components/table/schema/order";
import type { Order } from "@/modules/dashboard/data/order";
import { UserAvatar } from "@/modules/dashboard/components/table/user-avatar";

interface OrderFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Order) => void;
}

export const OrderForm = memo<OrderFormProps>(
  ({ open, onOpenChange, onSubmit }) => {
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

    const handleImageUpload = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const result = e.target?.result as string;
            setFormData((prev) => ({ ...prev, avatar: result }));
          };
          reader.readAsDataURL(file);
        }
      },
      []
    );

    const handleFormSubmit = useCallback(() => {
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

      onSubmit(newOrder);
      onOpenChange(false);
      setFormData({
        userName: "",
        project: "",
        address: "",
        status: "Pending",
        avatar: "",
      });
      setFormErrors({});
    }, [formData, onSubmit, onOpenChange]);

    const handleFormCancel = useCallback(() => {
      onOpenChange(false);
      setFormData({
        userName: "",
        project: "",
        address: "",
        status: "Pending",
        avatar: "",
      });
      setFormErrors({});
    }, [onOpenChange]);

    const clearFieldError = useCallback(
      (field: keyof OrderFormData) => {
        if (formErrors[field]) {
          setFormErrors((prev) => ({ ...prev, [field]: undefined }));
        }
      },
      [formErrors]
    );

    const updateFormData = useCallback(
      (field: keyof OrderFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        clearFieldError(field);
      },
      [clearFieldError]
    );

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
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
                onChange={(e) => updateFormData("userName", e.target.value)}
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
                        onClick={() => updateFormData("avatar", "")}
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
                onChange={(e) => updateFormData("project", e.target.value)}
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
                onChange={(e) => updateFormData("address", e.target.value)}
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
                onValueChange={(value: Order["status"]) =>
                  updateFormData("status", value)
                }
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
    );
  }
);

OrderForm.displayName = "OrderForm";
