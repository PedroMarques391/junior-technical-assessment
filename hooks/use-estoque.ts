import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import z from "zod";

export const updateStockSchema = z.object({
  id: z.string(),
  quantidade: z.coerce.number().int().min(0, "A Quantidade é obrigatória!"),
});

export type UpdateStockPayload = z.infer<typeof updateStockSchema>;

export interface Estoque {
  id: string;
  produto_id: string;
  quantidade: number;
  data: string;
  produtos: {
    nome: string;
    estoque_minimo: number;
  };
}

export const fetchStock = async (): Promise<Estoque[]> => {
  const response = await fetch("/api/estoque");
  if (!response.ok) {
    throw new Error("Failed to fetch stocks");
  }
  return response.json();
};

const fetchStockById = async (id: string): Promise<Estoque> => {
  const response = await fetch(`/api/estoque/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch stock with ID ${id}`);
  }
  return response.json();
};

const updateStock = async (payload: UpdateStockPayload): Promise<Estoque> => {
  const response = await fetch(`/api/estoque/${payload.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update stock");
  }
  return response.json();
};

export const useStocks = () => {
  return useQuery<Estoque[], Error>({
    queryKey: ["stocks"],
    queryFn: fetchStock,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
};

export const useSctock = (id: string) => {
  return useQuery<Estoque, Error>({
    queryKey: ["stocks", id],
    queryFn: () => fetchStockById(id),
  });
};

export const useUpdateStock = () => {
  const queryClient = useQueryClient();
  return useMutation<Estoque, Error, UpdateStockPayload>({
    mutationFn: updateStock,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["stocks"] });
      queryClient.invalidateQueries({ queryKey: ["stocks", data.id] });
    },
  });
};
