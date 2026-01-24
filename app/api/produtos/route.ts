import * as service from "@/services/produtos.service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const produtos = await service.getAllProdutos();
    if (!produtos) {
      return NextResponse.json(
        { error: "Nenhum produto encontrado" },
        { status: 404 },
      );
    }
    const produtosSerialized = produtos.map((produto) => {
      return JSON.parse(
        JSON.stringify(produto, (key, value) =>
          typeof value === "bigint" ? value.toString() : value,
        ),
      );
    });
    return NextResponse.json(produtosSerialized);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Falha ao obter produtos",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sku, nome, categoria_id, estoque_minimo, marca } = body;

    if (!sku || !nome) {
      return NextResponse.json(
        { error: "SKU e Nome são obrigatórios" },
        { status: 400 },
      );
    }

    const newProduto = await service.createProduto({
      sku: sku.toUpperCase(),
      nome,
      categoria_id: categoria_id ? BigInt(categoria_id) : null,
      estoque_minimo,
      marca,
    });
    const newProdutoSerialized = JSON.parse(
      JSON.stringify(newProduto, (key, value) =>
        typeof value === "bigint" ? value.toString() : value,
      ),
    );
    return NextResponse.json(newProdutoSerialized, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Falha ao criar produto",
      },
      {
        status:
          error instanceof Error && error.message.includes("SKU") ? 400 : 500,
      },
    );
  }
}
