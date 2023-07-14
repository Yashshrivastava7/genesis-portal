import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Events() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("./api/auth/signin");
  }

  console.log(session);
  return (
    <>
      <h1>Hello from Events Page!</h1>
      <pre>{JSON.stringify(session)}</pre>
    </>
  );
}
