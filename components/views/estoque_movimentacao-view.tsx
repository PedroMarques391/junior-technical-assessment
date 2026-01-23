"use client";

import { DataTable } from "@/components/custom/data-table";
import { useStockMovements } from "@/hooks/use-estoque-movimentacoes";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useState } from "react";
import { AddStockMovements } from "../estoque_movimentacao/add-movientacao-modal";
import { estoqueMovimentacaoColumns } from "../estoque_movimentacao/estoque-movimentacao-columns";
import { DeleteStockMovementDialog } from "../estoque_movimentacao/estoque-movimentacao-delete-dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function EstoqueMovimentacaoView() {
  const { data, isError, error, isLoading } = useStockMovements();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const handleDelete = (id: string) => {
    setSelectedId(id);
    setDeleteModalOpen(true);
  };

  const handleTypeChange = (value: string) => {
    setTypeFilter(value);

    if (value === "all") {
      setColumnFilters((prev) =>
        prev.filter((filter) => filter.id !== "tipo")
      );
      return;
    }
    setColumnFilters((prev) => {
        const withoutTipo = prev.filter((filter) => filter.id !== "tipo");
        return [...withoutTipo, { id: "tipo", value }];
      });
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
        columns={estoqueMovimentacaoColumns}
        data={data || []}
        isLoading={isLoading}
        onDelete={handleDelete}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        searchComponent={
          <Input
            placeholder="Buscar por quantidade ou produto..."
            className="max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        }
        filterComponent={
          <Select value={typeFilter} onValueChange={handleTypeChange}>
            <SelectTrigger className="w-full max-w-48">
              <SelectValue placeholder="Selecione um tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tipo</SelectLabel>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="entrada">Entrada</SelectItem>
                <SelectItem value="saida">Saída</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
      <DeleteStockMovementDialog
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        movementId={selectedId}
      />
    </>
  );
}
