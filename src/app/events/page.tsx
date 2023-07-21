"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { Register } from "../auth";

type eventType = {
  id: string;
  author: string;
  title: string;
  content: string;
};

export async function createEvent(props: eventType) {
  "use server";
  console.log(props);
}

export default async function Events() {
  const prisma = new PrismaClient();
  const events: eventType[] = await prisma.event.findMany();
  const session = await getServerSession(authOptions);
  console.log(events);

  if (!session) {
    redirect("./api/auth/signin");
  }

  console.log(session);
  return (
    <>
      <h1 className="text-center m-3">Hello from Events Page!</h1>
      <pre className="text-center m-3">{JSON.stringify(session)}</pre>
      <div className="flex flex-col justify-center items-center text-center">
        {events.map((event: eventType) => (
          <div className="border-solid border-2 m-1 w-40" key={event.id}>
            <h1>{event.author}</h1>
            <h1>{event.title}</h1>
            <h1>{event.content}</h1>
            <Register {...event} />
          </div>
        ))}
      </div>
    </>
  );
}
