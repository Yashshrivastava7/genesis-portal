import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import Link from "next/link";

export default async function AdminDashBoard() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (session.user.role !== "ADMIN") {
    return <h1>Unauthorized</h1>;
  }
  async function handleSubmit(data: FormData) {
    "use server";
    console.log(data);
  }
  return (
    <>
      <h1 className="text-center m-3">Hello from Admin DashBoard</h1>
      <pre className="text-center m-3">{JSON.stringify(session)}</pre>
      <div className="h-screen w-screen flex justify-center ">
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
      </div>
    </>
  );
}
