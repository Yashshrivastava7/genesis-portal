"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";

export function LoginButton() {
  return <Button onClick={() => signIn()}>Login</Button>;
}

export function LogoutButton() {
  return <Button onClick={() => signOut()}>Logout</Button>;
}

export function Register(props) {
  return <Button onClick={() => console.log(props)}>Register</Button>;
}
