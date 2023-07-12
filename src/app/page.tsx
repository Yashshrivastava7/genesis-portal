import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if(!session) {
    redirect('./api/auth/signin')
  }
  return (
    <>
      <h1>Hello from Home Page!</h1>
    <pre>{JSON.stringify(session)}</pre>
    </>
  );
}
