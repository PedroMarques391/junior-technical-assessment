import { estoque } from "@/generated/prisma/client";
import * as repository from "@/repositories/estoque.repository";

export const getAllEstoque = async (): Promise<estoque[]> => {
  return await repository.findAll();
};

export const updateEstoque = async (
  id: bigint,
  data: Partial<Omit<estoque, 'id' | 'produto_id' | 'atualizado_em'>>,
): Promise<estoque> => {
  const hasEstoque = await repository.findById(id);
  if (!hasEstoque) {
    throw new Error("Sem estoque para o ID informado: " + id);
  }
  return await repository.update(id, data);
};

export const getEstoqueById = async (id: bigint): Promise<estoque | null> => {
  return await repository.findById(id);
};
