"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";

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
  return (
    <Button className="m-2" onClick={() => console.log(props)}>
      Register
    </Button>
  );
}
