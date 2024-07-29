// "use server"
import { signIn } from "../../../auth";
import { Button } from "flowbite-react";
import Link from "next/link";
import { postNewUser } from "../lib/data/users";
import { redirect } from "next/navigation";

export default async function RegisterForm() {
  async function createUser(formData) {
    "use server";

    const newUser = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      bio: formData.get("bio"),
      avatar_img: formData.get("avatar_img"),
    };
      await postNewUser(newUser);
      redirect('/login');
  }
  return (
    <div className="h-screen flex max-height:100px max-width:100px m-3 p-3 border-black border-2">
      <div className="grow">
        <div>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white my-3">
            Register
          </h3>
          <form action={createUser}>
            <div>
              <div className="mb-2 block">
                <label htmlFor="username">Username</label>
              </div>
              <input
                className="w-full"
                id="username"
                name="username"
                type="text"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <label htmlFor="email">Email</label>
              </div>
              <input className="w-full" id="email" name="email" type="email" />
            </div>
            <div className="my-3">
              <div className="mb-2 block">
                <label htmlFor="password">Password</label>
              </div>
              <input
                className="w-full"
                id="password"
                name="password"
                type="password"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <label htmlFor="bio">Bio</label>
              </div>
              <textarea className="w-full" id="bio" name="bio"></textarea>
            </div>
            <div>
              <div className="mb-2 block">
                <label htmlFor="avatar_img">Profile Picture (max 4.5mb)</label>
              </div>
              <input className="w-full" id="avatar_img" name="avatar_img" type="file" accept="image/*"/>
            </div>
            <div className="w-full">
              <Button type="submit">Register</Button>
            </div>
          </form>
          <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
            Already registered?&nbsp;
            <Link
              href="/login"
              className="text-cyan-700 hover:underline dark:text-cyan-500"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
