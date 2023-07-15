import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";

export default async function Events() {
  const prisma = new PrismaClient();
  const events = await prisma.event.findMany();
  const session = await getServerSession(authOptions);
  console.log(events);

  if (!session) {
    redirect("./api/auth/signin");
  }

  console.log(session);
  return (
    <>
      <h1>Hello from Events Page!</h1>
      <pre>{JSON.stringify(session)}</pre>
      <div className="text-center">
        {events.map((event) => (
          <h1>{event.title}</h1>
        ))}
      </div>
    </>
  );
}
