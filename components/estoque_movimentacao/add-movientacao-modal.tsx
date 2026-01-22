"use client";

import { BaseModal } from "@/components/custom/base-modal";
import { DynamicForm } from "@/components/custom/dynamic-form";
import {
  CreateEstoqueMovimetacaoScheme,
  useCreateMovement,
} from "@/hooks/use-estoque-movimentacoes";
import { toast } from "sonner";
import * as z from "zod";

export function AddStockMovements({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const createStockMovementMutation = useCreateMovement();

  const formFields = [
    {
      name: "produto_id" as const,
      label: "Produto ID",
      placeholder: "ID do Produto",
      component: "input" as const,
    },
    {
      name: "quantidade" as const,
      label: "Quantidade",
      placeholder: "Quantidade do Produto",
      component: "input" as const,
    },
    {
      name: "tipo" as const,
      label: "Tipo",
      placeholder: "Selecione o tipo",
      component: "select" as const,
      options: [
        { label: "Entrada", value: "entrada" },
        { label: "Saída", value: "saida" },
      ],
    },
  ];

  const handleSubmit = (
    data: z.infer<typeof CreateEstoqueMovimetacaoScheme>,
  ) => {
    createStockMovementMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Movimentação criada com sucesso!");
        onClose();
      },
      onError: (error) => {
        toast.error(`Erro ao criar movimentação: ${error.message}`);
      },
    });
  };

  return (
    <BaseModal
      title="Nova Movimentação"
      description="Preencha os detalhes para criar uma nova movimentação."
      isOpen={isOpen}
      onClose={onClose}
    >
      <DynamicForm
        schema={CreateEstoqueMovimetacaoScheme}
        onSubmit={handleSubmit}
        fields={formFields}
        defaultValues={{
          produto_id: "",
          quantidade: "",
          tipo: "entrada",
        }}
        submitButtonText="Criar Movimentação"
        isSubmitting={createStockMovementMutation.isPending}
      />
    </BaseModal>
  );
}
