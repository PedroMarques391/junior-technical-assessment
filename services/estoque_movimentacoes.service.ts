import { estoque_movimentacoes } from "@/generated/prisma/client";
import * as repositoryEstoque from "../repositories/estoque.repository";
import * as repository from "../repositories/estoque_movimentacoes.repository";

export const getAllEstoqueMovimentacoes = async () => {
  return await repository.findAll();
};

export const createMovimentacao = async (
  data: Partial<Omit<estoque_movimentacoes, "id" | "criado_em">>,
) => {
  const estoque = await repositoryEstoque.findByProdutoId(data.produto_id);
  if (!estoque) {
    throw new Error(
      `Estoque não encontrado para o produto ID: ${data.produto_id}`,
    );
  }

  if (data.tipo === "saida" && data.quantidade > estoque.quantidade) {
    throw new Error(
      `Quantidade insuficiente em estoque para o produto: ${estoque.produtos.nome}. Estoque atual: ${estoque.quantidade}.`,
    );
  }

  if (data.quantidade <= 0) {
    throw new Error("A quantidade deve ser maior que zero.");
  }
  return await repository.create(data);
};

export const removeMovimentacao = async (id: bigint) => {
  const movimentacao = await repository.getMovimentacaoById(id);
  if (!movimentacao) {
    throw new Error(`Movimentação com ID ${id} não existe.`);
  }
  return await repository.remove(id);
};
