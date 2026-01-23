"use client";

import { EstoqueMovimetacao } from "@/hooks/use-estoque-movimentacoes";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const estoqueMovimentacaoColumns: ColumnDef<EstoqueMovimetacao>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableGlobalFilter: false,
    enableSorting: false,
  },
  {
    accessorKey: "produtos.nome",
    header: "Nome Produto",
    enableGlobalFilter: true,
  },
  {
    accessorKey: "produto_id",
    header: "ID Produto",
    enableGlobalFilter: false,
  },
  {
    accessorKey: "quantidade",
    header: "Quantidade",
    enableGlobalFilter: true,
  },
  {
    accessorKey: "tipo",
    header: "Tipo",
    enableGlobalFilter: true,
    enableSorting: false,
  },

  {
    accessorKey: "criado_em",
    header: "Criado Em",
    cell: ({ row }) => {
      const date = new Date(row.getValue("criado_em"));
      return format(date, "dd/MM/yyyy HH:mm");
    },
    enableGlobalFilter: false,
  },
];
