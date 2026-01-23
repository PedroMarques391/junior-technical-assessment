"use client";

import { DataTable } from "@/components/custom/data-table";
import { AddProductModal } from "@/components/produtos/produto-add-modal";
import { produtoColumns } from "@/components/produtos/produto-columns";
import { DeleteProductDialog } from "@/components/produtos/produto-delete-dialog";
import { EditProductModal } from "@/components/produtos/produto-edit-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/use-categorias";
import { Produto, useProdutos } from "@/hooks/use-produtos";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useState } from "react";


export function ProdutosView() {
  const { data: produtos, isLoading, isError, error } = useProdutos();
  const { data: categories } = useCategories();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Produto | null>(null);
  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const handleEdit = (id: string) => {
    const productToEdit = produtos?.find((prod) => prod.id === id);

    if (productToEdit) {
      setSelectedProduct(productToEdit);
      setIsEditModalOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    setProductIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  if (isError) {
    return (
      <div className="text-red-500">
        Error: {error?.message || "Failed to load products."}
      </div>
    );
  }

  const categoryOptions =
    categories?.map((category) => {
      return { value: category.id, label: category.nome };
    }) || [];


  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);

    if (value === "all") {
      setColumnFilters((prev) =>
        prev.filter((filter) => filter.id !== "categoriaId"),
      );
      return;
    }
    setColumnFilters((prev) => {
      const withoutCategoria = prev.filter(
        (filter) => filter.id !== "categoriaId",
      );
      return [...withoutCategoria, { id: "categoriaId", value }];
    });
  };
  return (
    <>
      <DataTable
        columns={produtoColumns}
        data={produtos || []}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        filterComponent={
          <Select value={categoryFilter} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full max-w-48">
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categorias</SelectLabel>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {categoryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        }
        searchComponent={
          <Input
            placeholder="Buscar produtos por nome, ID ou SKU..."
            className="max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="search"
          />
        }
        actionButtons={[
          <Button key="new-product" onClick={() => setIsAddModalOpen(true)}>
            Novo Produto
          </Button>,
        ]}
      />

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        product={selectedProduct}
      />
      <DeleteProductDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        productId={productIdToDelete}
      />
    </>
  );
}
