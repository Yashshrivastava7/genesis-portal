'use client'
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx"

export default function EventDB() {

    const params = useParams();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const session = useSession();
    useEffect(() => {
        setLoading(true)
        fetch("/api/fetchevent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: params.eventTitle })
        }).then(res => res.json()).then(data => {
            setUsers(data.users)
            setLoading(false)
        })
    }, [])


    function downloadExcel(users) {
        const worksheet = XLSX.utils.json_to_sheet(users);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
        XLSX.writeFile(workbook, "users.xlsx")
    }

    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }


    if (session.data.user.role !== "ADMIN") {
        return (
            <h1>Unauthorized</h1>
        )
    }

    return (
        <>
            <h1 className="text-center m-3">Hello from Event List</h1>
            <div className="flex flex-col border border-black w-screen m-1">
                <table>
                    <thead>
                        <tr>
                            <th className="border border-black">Name</th>
                            <th className="border border-black">Email</th>
                            <th className="border border-black">Event</th>
                            <th className="border border-black">Number</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {users.map((user: any) => (
                            <tr key={user.id}>
                                <td className="border border-black">{user.user}</td>
                                <td className="border border-black">{user.email}</td>
                                <td className="border border-black">{user.event}</td>
                                <td className="border border-black">{user.number}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center items-center">
                <button className="bg-green-400 rounded-lg shadow px-2 py-1 hover:bg-green-600" onClick={() => downloadExcel(users)}>Save as Excel</button>
            </div>
        </>
    )
}