"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";
import { registerEvent } from "./events/page";
import { useTransition } from "react";



type newEventType = {
  title: string;
  location: string;
  date: string;
  capacity: number;
  content: string;
}

export function LoginButton() {
  return <Button onClick={() => signIn()}>Login</Button>;
}

export function LogoutButton() {
  return <Button onClick={() => signOut()}>Logout</Button>;
}


// New Event Register Button - Aaryan
export function RegisterEvent(props: newEventType) {
  let [isPending, startTransition] = useTransition();
  return (
    <Button
      className="m-2"
      onClick={() => startTransition(() => registerEvent(props))}
    >
      Register
    </Button>
  );
}
