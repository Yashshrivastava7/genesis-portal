import Link from "next/link";

export default function Navbar() {

    return (
        <>
            <Link href="/">Home</Link>
            <Link href="events">Events</Link>
            <Link href="/blog">Blogs</Link>
        </>
    );
}