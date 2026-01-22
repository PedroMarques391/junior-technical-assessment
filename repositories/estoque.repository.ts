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

export const update = async (
  id: bigint,
  data: Partial<estoque>,
): Promise<estoque> => {
  return prisma.estoque.update({
    where: { id },
    data,
  });
};
