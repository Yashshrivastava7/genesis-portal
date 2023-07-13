import { Input } from "@/components/ui/input";
import { PrismaClient } from "@prisma/client";
import { Suspense } from "react";
import bcrypt from "bcrypt";

import Link from "next/link";

export default function Register() {
  async function handleSubmit(data: FormData) {
    "use server";
    const email = data.get("email");
    const password = data.get("password");
    const hash = bcrypt.hash(password, 10);
    const name = data.get("name");
    const prisma = new PrismaClient();
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email as string,
      },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const user = await prisma.user.create({
      data: {
        email: email as string,
        password: hash as string,
        name: name as string,
      },
    });
  }

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center bg-slate-100 ">
        <div className="flex flex-col px-8 pb-8 pt-12 rounded-xl space-y-12 w-[500px] h-[500px] bg-[#97FEED] shadow-md justify-center">
          <p className="text-2xl text-center ">Register Here!</p>
          <Suspense fallback={<div>Loading...</div>}>
            <form action={handleSubmit}>
              <Input
                type="text"
                placeholder="Name"
                name="name"
                className="rounded-l text-[18px] my-8"
                required
              />

              <Input
                type="email"
                placeholder="Email"
                name="email"
                className="rounded-l text-[18px] my-15"
                required
              />

              <Input
                type="password"
                placeholder="Password"
                name="password"
                minLength={8}
                className="rounded-l text-[18px] my-8"
                required
              />

              <button
                type="submit"
                className="rounded-2xl bg-gray-700 py-2 px-2 w-full text-white"
              >
                Register
              </button>
              <p className="m-2 text-center">
                Have an account?
                <Link
                  href="../api/auth/signin"
                  className="text-indigo-600 hover:text-red-500 underline"
                >
                  Login
                </Link>
              </p>
            </form>
          </Suspense>
        </div>
      </div>
    </>
  );
}
