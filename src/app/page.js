"use server"
 
import { signIn } from "next-auth/react"
import { postNewUser } from "./lib/data/users"

export default async function Home() {
  
  //   postNewUser({
  //     username: 'testing testingk 12',
  //     password: 'test123',
  //     email: 'test1m2@test.com',
  //     bio: 'i am a test',
  //     avatar_img_url: 'dummy link'
  // })

  return (<button >Sign in</button>
)
}
