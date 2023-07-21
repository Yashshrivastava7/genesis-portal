"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";
import { createEvent } from "./events/page";
import { useTransition } from "react";

type eventType = {
  id: string;
  author: string;
  title: string;
  content: string;
};

export function LoginButton() {
  return <Button onClick={() => signIn()}>Login</Button>;
}

export function LogoutButton() {
  return <Button onClick={() => signOut()}>Logout</Button>;
}

export function Register(props: eventType) {
  let [isPending, startTransition] = useTransition();
  return (
    <Button
      className="m-2"
      onClick={() => startTransition(() => createEvent(props))}
    >
      Register
    </Button>
  );
}
