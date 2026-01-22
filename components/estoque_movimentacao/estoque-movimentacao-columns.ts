"use client";

import { EstoqueMovimetacao } from "@/hooks/use-estoque-movimentacoes";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const estoqueMovimentacaoColumns: ColumnDef<EstoqueMovimetacao>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "produtos.nome",
    header: "Nome Produto",
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
    accessorKey: "tipo",
    header: "Tipo",
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
