import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import z from "zod";
import { Produto } from "./use-produtos";

export interface EstoqueMovimetacao {
  id: string;
  produto_id: string;
  quantidade: number;
  tipo: "entrada" | "saida";
  criado_em: string;
  produtos: Produto[];
}

export const CreateEstoqueMovimetacaoScheme = z.object({
  produto_id: z.string().min(1, "O ID do produto é obrigatório."),
  quantidade: z.string().min(1, "A quantidade deve ser pelo menos 1"),
  tipo: z.enum(["entrada", "saida"]).default("entrada"),
});

export type EstoqueMovimetacaoPayload = z.infer<
  typeof CreateEstoqueMovimetacaoScheme
>;

const fetchStockMovements = async (): Promise<EstoqueMovimetacao[]> => {
  const response = await fetch("/api/estoque-movimentacoes");
  if (!response.ok) {
    throw new Error("Failed to fetch stock movements");
  }
  return response.json();
};

const createMovements = async (data: EstoqueMovimetacaoPayload) => {
  const response = await fetch("/api/estoque-movimentacoes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create stock movement");
  }
  return response.json();
};

export const useStockMovements = () => {
  return useQuery<EstoqueMovimetacao[], Error>({
    queryKey: ["stock-movements"],
    queryFn: fetchStockMovements,
  });
};

export const useCreateMovement = () => {
  const queryClient = useQueryClient();
  return useMutation<EstoqueMovimetacao, Error, EstoqueMovimetacaoPayload>({
    mutationFn: createMovements,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stock-movements"] });
    },
  });
};
