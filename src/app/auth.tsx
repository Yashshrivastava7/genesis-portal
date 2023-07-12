'use client'
import { Button } from '@/components/ui/button'
import { signIn, signOut } from 'next-auth/react'

export function LoginButton() {
 <button onClick={() => signIn()}>Sign in</button>
}

export function LogoutButton() {
    <button onClick={() => signOut()}>Logout</button>
}

