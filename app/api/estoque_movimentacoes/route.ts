import { tipo_movimentacao } from "@/app/generated/prisma/enums";
import * as service from "@/services/estoque_movimentacoes.service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const estoqueMovimentacoes = await service.getAllEstoqueMovimentacoes();
    const estoqueMovimentacoesSerialized = JSON.parse(
      JSON.stringify(estoqueMovimentacoes, (key, value) =>
        typeof value === "bigint" ? value.toString() : value,
      ),
    );
    return NextResponse.json(estoqueMovimentacoesSerialized, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Falha ao obter movimentações",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { produto_id, quantidade, tipo } = body;

    if (!produto_id || !quantidade || !tipo) {
      return NextResponse.json(
        { error: "Produtos ID, Quantidade e Tipo são obrigatórios." },
        { status: 400 },
      );
    }

    if (tipo !== "entrada" && tipo !== "saida") {
      return NextResponse.json(
        { error: "Tipo inválido. Use 'entrada' ou 'saida'." },
        { status: 400 },
      );
    }

    const novaMovimentacao = await service.createMovimentacao({
      produto_id: BigInt(produto_id),
      quantidade: Number(quantidade),
      tipo: tipo as tipo_movimentacao,
    });

    const novaMovimentacaoSerialized = JSON.parse(
      JSON.stringify(novaMovimentacao, (key, value) =>
        typeof value === "bigint" ? value.toString() : value,
      ),
    );

    return NextResponse.json(novaMovimentacaoSerialized, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao criar movimentação.",
      },
      { status: 500 },
    );
  }
}
