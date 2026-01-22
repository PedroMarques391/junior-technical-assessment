import * as service from "@/services/estoque.service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const estoque = await service.getAllEstoque();
    if (!estoque) {
      return NextResponse.json(
        { error: "Nenhum item de estoque encontrado" },
        { status: 404 },
      );
    }
    const estoqueSerialized = estoque.map((item) => {
      return JSON.parse(
        JSON.stringify(item, (key, value) =>
          typeof value === "bigint" ? value.toString() : value,
        ),
      );
    });
    return NextResponse.json(estoqueSerialized);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Falha ao obter estoque",
      },
      { status: 500 },
    );
  }
}
