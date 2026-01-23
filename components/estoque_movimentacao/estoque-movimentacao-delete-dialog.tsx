"use client";

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
import { useDeleteMovement } from "@/hooks/use-estoque-movimentacoes";
import { toast } from "sonner";

export function DeleteStockMovementDialog({
  isOpen,
  onClose,
  movementId,
}: {
  isOpen: boolean;
  onClose: () => void;
  movementId: string | null;
}) {
  const deleteMovementMutation = useDeleteMovement();

  const handleDelete = () => {
    if (!movementId) return;
    deleteMovementMutation.mutate(movementId, {
      onSuccess: () => {
        toast.success("Historico excluído com sucesso!");
        onClose();
      },
      onError: (error) => {
        toast.error(`Erro ao excluir Historico: ${error.message}`);
      },
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Isso excluirá permanentemente a
            movimentação do histórico.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteMovementMutation.isPending}
          >
            {deleteMovementMutation.isPending ? "Excluindo..." : "Excluir"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
