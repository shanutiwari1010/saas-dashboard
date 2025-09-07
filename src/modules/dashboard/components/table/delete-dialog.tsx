import { memo } from "react";

import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import type { DeleteTarget } from "@/modules/dashboard/types/table";

interface DeleteDialogProps {
  open: boolean;
  deleteTarget: DeleteTarget | null;
  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
}

export const DeleteDialog = memo<DeleteDialogProps>(
  ({ open, onOpenChange, deleteTarget, onConfirm }) => {
    return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
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
              onClick={onConfirm}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
);

DeleteDialog.displayName = "DeleteDialog";
