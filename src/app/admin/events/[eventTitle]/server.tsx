"use server";
import { PrismaClient } from "@prisma/client";

type eventType = {
  title: string;
  location: string;
  date: string;
  capacity: number;
  content: string;
};

//Server action to get users that have registered on a event
export async function getUsers(body: eventType) {
  const prisma = new PrismaClient();

  const users = await prisma.registration.findMany({
    where: {
      event: body.title,
    } as any,
  });
  return users;
}
