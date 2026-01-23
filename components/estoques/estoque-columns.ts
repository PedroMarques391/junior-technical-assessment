"use client";

import { Estoque } from "@/hooks/use-estoque";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const estoqueColumns: ColumnDef<Estoque>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableGlobalFilter: false,
  },
  {
    accessorKey: "produtos.nome",
    header: "Nome do Produto",
    enableGlobalFilter: true,
  },
  {
    accessorKey: "produto_id",
    header: "ID Produto",
    enableGlobalFilter: true,
  },
  {
    accessorKey: "quantidade",
    header: "Quantidade",
    enableGlobalFilter: false,
  },

  {
    accessorKey: "atualizado_em",
    header: "Atualizado Em",
    cell: ({ row }) => {
      const date = new Date(row.getValue("atualizado_em"));
      return format(date, "dd/MM/yyyy HH:mm");
    },
    enableGlobalFilter: false,
  },
];
