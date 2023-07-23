import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import Link from "next/link";

type newEventType = {
  id: string;
  title: string;
  location: string;
  date: string;
  capacity: number;
  content: string;
};

export default async function EventList() {
  const prisma = new PrismaClient();
  const newEvents = await prisma.newEvent.findMany();

  const session = await getServerSession(authOptions);
  if (session.user.role !== "ADMIN") {
    return <h1>Unauthorized</h1>;
  }

  return (
    <>
      <h1 className="text-center m-3">Hello from Event List</h1>
      <div className="flex flex-col justify-center items-center ">
        {newEvents.map((newEvent: newEventType) => (
          <ul key={newEvent.id} className="flex">
            <li className="bg-gray-400 rounded shadow px-2 m-2">
              {newEvent.title}
            </li>
            <Link
              href={`/admin/events/${newEvent.title}`}
              className="mx-2 bg-cyan-300 rounded shadow px-2 py-1 m-2 hover:bg-blue-300 "
            >
              Click Here
            </Link>
          </ul>
        ))}
      </div>
    </>
  );
}
