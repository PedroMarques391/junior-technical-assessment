"use client";

import { DataTable } from "@/components/custom/data-table";
import { estoqueColumns } from "@/components/estoques/estoque-columns";
import { EstoqueEditModal } from "@/components/estoques/estoque-edit-modal";
import { Estoque, useStocks } from "@/hooks/use-estoque";
import { useState } from "react";
import { Input } from "../ui/input";

export function EstoqueView() {
  const { data, isError, error, isLoading } = useStocks();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Estoque | null>(null);

  const handleEdit = (id: string) => {
    const stockToEdit = data?.find((stock) => stock.id === id);
    if (stockToEdit) {
      setSelectedStock(stockToEdit);
      setIsEditModalOpen(true);
    }
  };
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
        columns={estoqueColumns}
        data={data || []}
        onEdit={handleEdit}
        isLoading={isLoading}
        searchComponent={
          <Input placeholder="Buscar Estoque..." className="max-w-sm" />
        }
      />

      <EstoqueEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        estoque={selectedStock}
      />
    </>
  );
}
