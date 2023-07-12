import { Input } from "@/components/ui/input";
import { PrismaClient } from "@prisma/client";
import { redirect } from 'next/navigation'
import { NextResponse } from "next/server";
import { Suspense } from "react";


export default function Register() {
    async function handleSubmit(data : FormData) {
        'use server'
        const email = data.get("email")
        const password = data.get("password")
        const prisma = new PrismaClient()  
        const existingUser = await prisma.user.findUnique({
            where : {
                email : email as string
            }
        })
        
        if(existingUser) {
            throw new Error("User already exists")
        }

        const user = await prisma.user.create({
            data : {
                email: email as string,
                password : password as string
            }
        })


    }
    
    return (
        <>
            <div className="h-screen w-screen flex justify-center items-center bg-slate-100 ">
                <div className="flex flex-col px-8 pb-8 pt-12 rounded-xl space-y-12 w-[500px] h-[500px] bg-[#97FEED] shadow-md justify-center">
                        <p className="text-2xl text-center ">Register Here!</p>
                <Suspense fallback={<div>Loading...</div>}>
                <form action={handleSubmit}>
                        <Input 
                        type="email" 
                        placeholder="Email" 
                        name="email"
                        className="rounded-l text-[18px] text-center my-15"
                        />

                        <Input 
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength={8}
                        className="rounded-l text-[18px] text-center my-8"
                        />

                        <button type="submit" className="rounded-2xl bg-gray-700 py-2 px-2 w-full text-white">Register</button>
                        <p className="m-2 text-center">
                            Have an account?
                            <a href="/login" className="text-indigo-600 hover:text-red-500 underline ">Login</a>
                            
                        </p>
                    </form>

                    </Suspense>
                </div>
            </div>
        </>
    );
}