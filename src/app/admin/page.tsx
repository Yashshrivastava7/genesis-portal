import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

type eventType = {
  title: string;
  location: string;
  date: string;
  capacity: number;
  content: string;
};

export async function dateValidation(date: string) {
  const present = new Date().toISOString();
  if (date < present) {
    throw new Error("Date is in the past");
  }

  const split = date.split("T");
  return split[0];
}

export default async function AdminDashBoard() {
  const session = await getServerSession(authOptions);
  if (session.user.role !== "ADMIN") {
    return <h1 className="text-center">Unauthorized</h1>;
  }
  async function handleSubmit(e: FormData) {
    "use server";
    const prisma = new PrismaClient();
    const ISODate = new Date(e.get("date") as string).toISOString();
    const date = await dateValidation(ISODate);

    const event = await prisma.newEvent.create({
      data: {
        title: e.get("title") as string,
        location: e.get("location") as string,
        date: date as string,
        capacity: parseInt(e.get("capacity") as string),
        content: e.get("content") as string,
      } as eventType,
    });

    console.log(event);
  }

  return (
    <>
      <h1 className="text-center m-3">Hello from Admin DashBoard</h1>
      <pre className="text-center m-3">{JSON.stringify(session)}</pre>
      <div className="h-screen w-screen flex justify-center flex-col items-center">
        <div className="flex flex-col px-8 pb-8 pt-12 rounded-xl space-y-12 w-[500px] h-[500px] bg-[#97FEED] shadow-md justify-center">
          <form action={handleSubmit}>
            <textarea
              className="p-1"
              rows={1}
              cols={50}
              placeholder="Title"
              name="title"
              required
            />

            <input
              type="text"
              placeholder="Location"
              name="location"
              required
              className="p-1 m-1 text-gray-400 rounded"
            />

            <input
              type="datetime-local"
              name="date"
              className="p-1 m-1 text-gray-400 rounded"
            />

            <input
              type="number"
              placeholder="Capacity"
              name="capacity"
              className="p-1 m-1 text-gray-400 rounded w-full"
            />

            <textarea
              className="p-1"
              rows={10}
              cols={50}
              placeholder="Content"
              name="content"
              required
            />
            <button
              type="submit"
              className="rounded-2xl bg-gray-700 py-2 px-2 w-full text-white"
            >
              Register
            </button>
          </form>
        </div>

        <div className="flex flex-col rounded-xl mt-5 w-100 h-50 px-3 py-3 bg-[#97FEED] shadow-md justify-center">
          <Link href="/admin/events">View Events</Link>
        </div>
      </div>
    </>
  );
}
