import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function AdminDashBoard() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (session.user.role !== "ADMIN") {
    return <h1>Unauthorized</h1>;
  }
  return (
    <>
      <h1 className="text-center m-3">Hello from Admin DashBoard</h1>
      <pre className="text-center m-3">{JSON.stringify(session)}</pre>
    </>
  );
}
