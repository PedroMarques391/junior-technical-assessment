"use client";

import { BaseModal } from "@/components/custom/base-modal";
import { DynamicForm } from "@/components/custom/dynamic-form";
import { Estoque, updateStockSchema, useUpdateStock } from "@/hooks/use-estoque";
import { toast } from "sonner";
import * as z from "zod";

export function EstoqueEditModal({
  isOpen,
  onClose,
  estoque,
}: {
  isOpen: boolean;
  onClose: () => void;
  estoque: Estoque | null;
}) {
  const updateStockMutation = useUpdateStock();

  const formFields = [
    {
      name: "quantidade" as const,
      label: "Quantidade",
      placeholder: "0",
      type: "number",
      component: "input" as const,
    },
  ];

  const handleSubmit = (data: z.infer<typeof updateStockSchema>) => {
    if (!estoque?.id) return;
    updateStockMutation.mutate(
      { ...data, id: estoque.id },
      {
        onSuccess: () => {
          toast.success("Estoque atualizado com sucesso!");
          onClose();
        },
        onError: (error) => {
          toast.error(`Erro ao atualizar estoque: ${error.message}`);
        },
      },
    );
  };

  return (
    <BaseModal
      title="Editar Estoque"
      description="Atualize a quantidade em estoque."
      isOpen={isOpen}
      onClose={onClose}
    >
      {estoque && (
        <DynamicForm
          schema={updateStockSchema}
          onSubmit={handleSubmit}
          defaultValues={{
            id: estoque.id,
            quantidade: estoque.quantidade,
          }}
          fields={formFields}
          submitButtonText="Salvar Alterações"
          isSubmitting={updateStockMutation.isPending}
        />
      )}
    </BaseModal>
  );
}
