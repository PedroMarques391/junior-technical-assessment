"use client";

import { Estoque } from "@/hooks/use-estoque";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const estoqueColumns: ColumnDef<Estoque>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "produtos.nome",
    header: "Nome do Produto",
  },
  {
    accessorKey: "produto_id",
    header: "ID Produto",
  },
  {
    accessorKey: "quantidade",
    header: "Quantidade",
  },

  {
    accessorKey: "atualizado_em",
    header: "Atualizado Em",
    cell: ({ row }) => {
      const date = new Date(row.getValue("atualizado_em"));
      return format(date, "dd/MM/yyyy HH:mm");
    },
  },
];
