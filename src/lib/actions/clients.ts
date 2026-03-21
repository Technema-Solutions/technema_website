"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAdminClients() {
  return prisma.client.findMany();
}

export async function createClient(data: {
  name: string;
  icon: string;
  logo?: string;
}) {
  const client = await prisma.client.create({ data });
  revalidatePath("/", "layout");
  return client;
}

export async function updateClient(
  id: string,
  data: {
    name?: string;
    icon?: string;
    logo?: string;
  }
) {
  await prisma.client.update({ where: { id }, data });
  revalidatePath("/", "layout");
}

export async function deleteClient(id: string) {
  await prisma.client.delete({ where: { id } });
  revalidatePath("/", "layout");
}
