"use client";

import { Produto } from "@/hooks/use-produtos";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const produtoColumns: ColumnDef<Produto>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableGlobalFilter: true,
  },
  {
    accessorKey: "sku",
    header: "SKU",
    enableGlobalFilter: true,
  },
  {
    accessorKey: "nome",
    header: "Nome",
    enableGlobalFilter: true,
  },
  {
    accessorKey: "categorias.nome",
    header: "Categoria",
    cell: ({ row }) => {
      const category = row.original.categorias;
      return category ? category.nome : "N/A";
    },
    enableGlobalFilter: true,
  },
  {
    accessorKey: "estoque_minimo",
    header: "Estoque Mínimo",
    enableGlobalFilter: false,
  },
  {
    accessorKey: "marca",
    header: "Marca",
    enableGlobalFilter: true,
  },
  {
    accessorKey: "criado_em",
    header: "Criado Em",
    cell: ({ row }) => {
      const date = new Date(row.getValue("criado_em"));
      return format(date, "dd/MM/yyyy HH:mm");
    },
  },
];
