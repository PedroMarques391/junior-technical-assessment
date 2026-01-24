import * as service from "@/services/estoque_movimentacoes.service";
import { NextResponse } from "next/server";

type Params = {
  params: Promise<{ id: string }>;
};

export async function DELETE(request: Request, { params }: Params) {
  try {
    const id = BigInt((await params).id);
    await service.removeMovimentacao(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Falha ao deletar movimentação",
      },
      { status: error instanceof Error ? 404 : 500 },
    );
  }
}
