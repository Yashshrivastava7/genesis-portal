"use client";
import { Input } from "@/components/ui/input";
import { getSession, signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default function Register() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/",
    });
  }

  const { status } = useSession();

  if (status === "authenticated") {
    redirect("/");
  }

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center bg-slate-100 ">
        <div className="flex flex-col px-8 pb-8 pt-12 rounded-xl space-y-12 w-[500px] h-[500px] bg-[#97FEED] shadow-md justify-center">
          <p className="text-2xl text-center ">Register Here!</p>
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email"
              name="email"
              className="rounded-l text-[18px] my-15"
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Password"
              name="password"
              minLength={8}
              className="rounded-l text-[18px] my-8"
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="rounded-2xl bg-gray-700 py-2 px-2 w-full text-white"
            >
              Login
            </button>
            <p className="m-2 text-center">
              Create an account{" "}
              <Link
                href="../api/auth/signin"
                className="text-indigo-600 hover:text-red-500 underline"
              >
                here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}