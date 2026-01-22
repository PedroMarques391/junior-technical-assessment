"use client";

import { DataTable } from "@/components/custom/data-table";
import { useStockMovements } from "@/hooks/use-estoque-movimentacoes";
import { useState } from "react";
import { AddStockMovements } from "../estoque_movimentacao/add-movientacao-modal";
import { estoqueMovimentacaoColumns } from "../estoque_movimentacao/estoque-movimentacao-columns";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function EstoqueMovimentacaoView() {
  const { data, isError, error, isLoading } = useStockMovements();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  if (isError) {
    return (
      <div className="text-red-500">
        Error: {error?.message || "Failed to load products."}
      </div>
    );
  }

  return (
    <>
      <DataTable
        columns={estoqueMovimentacaoColumns}
        data={data || []}
        isLoading={isLoading}
        searchComponent={
          <Input placeholder="Buscar Estoque..." className="max-w-sm" />
        }
        actionButtons={[
          <Button key="new-product" onClick={() => setIsAddModalOpen(true)}>
            Nova Movimentação
          </Button>,
        ]}
      />
      <AddStockMovements
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </>
  );
}
