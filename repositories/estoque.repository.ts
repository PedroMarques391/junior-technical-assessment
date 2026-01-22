import { estoque } from "@/generated/prisma/client";
import prisma from "@/lib/db";

export const findAll = async (): Promise<estoque[]> => {
  return await prisma.estoque.findMany();
};

export const findById = async (id: bigint): Promise<estoque | null> => {
  return prisma.estoque.findUnique({
    where: { id },
  });
};

export const findByProdutoId = async (
  produto_id: bigint,
): Promise<estoque | null> => {
  return prisma.estoque.findUnique({
    where: { produto_id },
    include: { produtos: true },
  });
};

export const update = async (
  id: bigint,
  data: Partial<Omit<estoque, "id" | "atualizado_em" | "produto_id">>,
): Promise<estoque> => {
  return prisma.estoque.update({
    where: { id },
    data: {
      ...data,
      atualizado_em: new Date(),
    },
  });
};
