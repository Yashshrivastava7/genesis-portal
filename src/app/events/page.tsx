"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { RegisterEvent } from "../auth";

type eventType = {
  title: string;
  location: string;
  date: string;
  capacity: number;
  content: string;
};

// Function imported in the client component auth.tsx used as onClick action
export async function registerEvent(props: eventType) {
  const prisma = new PrismaClient();
  const session = await getServerSession(authOptions);
  console.log(" Props => ", props);
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email as string,
    },
  });

  const register = await prisma.registration.create({
    data: {
      user: session.user.name as string,
      email: session.user.email as string,
      event: props.title as string,
      number: user?.number as string,
    } as any,
  });
  console.log("After Registration => ", register);
}

export default async function Events() {
  const prisma = new PrismaClient();
  const session = await getServerSession(authOptions);
  const newEvents: eventType[] = await prisma.newEvent.findMany();

  if (!session) {
    redirect("./api/auth/signin");
  }

  return (
    <>
      <h1 className="text-center m-3">Hello from Events Page!</h1>
      <pre className="text-center m-3">{JSON.stringify(session)}</pre>

      <div className="flex flex-col justify-center items-center ">
        {newEvents.map((event: eventType) => (
          <div
            className="flex flex-col justify-center items-center border-solid border-2 m-1 w-52 transition-shadow hover:shadow-lg "
            key={event.title}
          >
            <h1>{event.title}</h1>
            <h1>{event.location}</h1>
            <h1>{event.date}</h1>
            <h1>{event.capacity}</h1>
            <h1>{event.content}</h1>
            <RegisterEvent {...event} />
          </div>
        ))}
      </div>
    </>
  );
}
