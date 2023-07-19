import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import Link from "next/link";

export default async function AdminDashBoard() {
    const session = await getServerSession(authOptions)
    if (session.user.role !== "ADMIN") {
        return <h1>Unauthorized</h1>
    }
    return (
        <>
            <h1>Hello from Admin DashBoard</h1>
            <pre className="text-center m-3">{JSON.stringify(session)}</pre>

            <Link href={"/admin/createEvent"} className="bg-cyan-300 rounded-md px-2 py-3">Create a new event</Link>

        </>
    );
}