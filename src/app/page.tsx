import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
// import { redirect } from "next/navigation";
import { LoginButton, LogoutButton } from "./auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <>
        <div className="text-center">
          <h1 className="m-5">Please Login</h1>
          <LoginButton />
        </div>
      </>
    );
  }

  return (
    <>
      <Link href={`/profile/uname?=${session.user.name}`}>
          Profile
      </Link>

      <h1 className="text-center">Hello from Home Page!</h1>
      <pre className="text-center m-3">{JSON.stringify(session)}</pre>
      <div className="text-center m-3">
        <LogoutButton />
      </div>
    </>
  );
}
