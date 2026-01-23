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
    cell: ({ row }) => {
      const amount = row.original.quantidade;
      const minimumStock = row.original.produtos.estoque_minimo;

      let className =
        "p-2 rounded-md font-medium text-sm inline-block h-full w-full text-left ";

      if (amount < minimumStock) {
        className += " bg-red-100 text-red-800";
        return <span className={className}>{amount}</span>;
      }

      if (amount === minimumStock) {
        className += " bg-yellow-100 text-yellow-800";
        return <span className={className}>{amount}</span>;
      }

      className += " bg-green-100 text-green-800";
      return <span className={className}>{amount}</span>;
    },
    filterFn: (row, id, value) => {
      const amount = row.original.quantidade;
      const minimumStock = row.original.produtos.estoque_minimo;

      if (value === "low") {
        return amount < minimumStock;
      }
      if (value === "minimum") {
        return amount === minimumStock;
      }
      if (value === "ok") {
        return amount > minimumStock;
      }
      return true;
    },
  },
  {
    accessorKey: "produtos.estoque_minimo",
    header: "Estoque Mínimo",
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
