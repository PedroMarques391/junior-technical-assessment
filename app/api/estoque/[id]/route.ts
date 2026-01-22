import * as service from "@/services/estoque.service";
import { NextResponse } from "next/server";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const id = BigInt((await params).id);
    const body = await request.json();
    const { quantidade } = body;
    const updatedEstoque = await service.updateEstoque(id, { quantidade });
    const updatedEstoqueSerialized = JSON.parse(
      JSON.stringify(updatedEstoque, (key, value) =>
        typeof value === "bigint" ? value.toString() : value,
      ),
    );
    return NextResponse.json(updatedEstoqueSerialized, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        erro:
          error instanceof Error ? error.message : "Falha ao atualizar estoque",
      },
      { status: 500 },
    );
  }
}
