import { estoque_movimentacoes } from "@/generated/prisma/client";
import prisma from "@/lib/db";

export const findAll = async (): Promise<estoque_movimentacoes[]> => {
  return await prisma.estoque_movimentacoes.findMany({
    orderBy: { criado_em: "desc" },
    include: { produtos: true },
  });
};

export const getMovimentacaoById = async (
  id: bigint,
): Promise<estoque_movimentacoes | null> => {
  return prisma.estoque_movimentacoes.findUnique({
    where: { id },
  });
};

export const findMovimentacoesByProdutoId = async (
  produto_id: bigint,
): Promise<estoque_movimentacoes[]> => {
  return prisma.estoque_movimentacoes.findMany({
    where: { produto_id },
    include: { produtos: true },
  });
};

export const create = async (
  data: Partial<Omit<estoque_movimentacoes, "id" | "criado_em">>,
): Promise<estoque_movimentacoes> => {
  return prisma.$transaction(async (tx) => {
    const movimentacao = await tx.estoque_movimentacoes.create({
      data,
    });
    const ajuste = data.tipo === "entrada" ? data.quantidade : -data.quantidade;
    await tx.estoque.upsert({
      where: {
        produto_id: data.produto_id,
      },
      create: {
        produto_id: data.produto_id,
        quantidade: Math.max(0, ajuste),
      },
      update: {
        quantidade: {
          increment: ajuste,
        },
      },
    });
    return movimentacao;
  });
};

export const remove = async (id: bigint): Promise<estoque_movimentacoes> => {
  return prisma.estoque_movimentacoes.delete({
    where: { id },
  });
};
