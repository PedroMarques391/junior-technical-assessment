"use client";

import { DataTable } from "@/components/custom/data-table";
import { estoqueColumns } from "@/components/estoques/estoque-columns";
import { EstoqueEditModal } from "@/components/estoques/estoque-edit-modal";
import { Estoque, useStocks } from "@/hooks/use-estoque";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useState } from "react";
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

export function EstoqueView() {
  const { data, isError, error, isLoading } = useStocks();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Estoque | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [quantityFilter, setQuantityFilter] = useState("all");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const handleEdit = (id: string) => {
    const stockToEdit = data?.find((stock) => stock.id === id);
    if (stockToEdit) {
      setSelectedStock(stockToEdit);
      setIsEditModalOpen(true);
    }
  };

  const handleQuantityChange = (value: string) => {
    setQuantityFilter(value);

    if (value === "all") {
      setColumnFilters((prev) =>
        prev.filter((filter) => filter.id !== "quantidade")
      );
      return;
    }
    setColumnFilters((prev) => {
      const withoutQuantity = prev.filter(
        (filter) => filter.id !== "quantidade"
      );
      return [...withoutQuantity, { id: "quantidade", value }];
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
        columns={estoqueColumns}
        data={data || []}
        onEdit={handleEdit}
        isLoading={isLoading}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        filterComponent={
          <Select value={quantityFilter} onValueChange={handleQuantityChange}>
            <SelectTrigger className="w-full max-w-48">
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status do Estoque</SelectLabel>
                <SelectItem value="all">Todo o Estoque</SelectItem>
                <SelectItem value="ok">Em Estoque</SelectItem>
                <SelectItem value="minimum">Estoque Mínimo</SelectItem>
                <SelectItem value="low">Baixo Estoque</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        }
        searchComponent={
          <Input
            placeholder="Buscar por nome ou ID do produto..."
            className="max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="search"
          />
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
