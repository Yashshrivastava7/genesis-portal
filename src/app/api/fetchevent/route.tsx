import { PrismaClient } from "@prisma/client";

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);

  const prisma = new PrismaClient();

  const users = await prisma.registration.findMany({
    where: {
      event: body.title,
    } as any,
  });

  console.log("Server Side => ", users);
  return new Response(JSON.stringify({ message: "successful", users: users }));
}
