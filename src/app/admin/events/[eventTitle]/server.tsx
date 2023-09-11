"use server";
import { PrismaClient } from "@prisma/client";

//Server action to get users that have registered on a event
export async function getUsers(body: string) {
  const prisma = new PrismaClient();

  const users = await prisma.registration.findMany({
    where: {
      event: body,
    } as any,
  });
  console.log("server action: ", users);

  return users;
}
