"use client";

import { Categoria } from "@/hooks/use-categorias";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const categoriaColumns: ColumnDef<Categoria>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableGlobalFilter: true,
  },
  {
    accessorKey: "nome",
    header: "Nome",
    enableGlobalFilter: true,
  },
  {
    accessorKey: "descricao",
    header: "Descrição",
    enableGlobalFilter: false,
  },
  {
    accessorKey: "criado_em",
    header: "Criado Em",
    enableGlobalFilter: false,
    cell: ({ row }) => {
      const date = new Date(row.getValue("criado_em"));
      return format(date, "dd/MM/yyyy HH:mm");
    },
  },
];
