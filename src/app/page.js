"use client"
 
import { signIn } from "next-auth/react"

export default function Home() {
  return (
    <h1 class="text-center text-3xl m-10">Home Page</h1>
  // <button onClick={() => signIn()}>Sign in</button>
)
}
