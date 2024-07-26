// "use server"
import { signIn } from "../../../auth";
import { Button } from "flowbite-react";
import Link from "next/link";

export default async function SignInForm() {
  return (
    <div className="h-screen flex max-height:100px max-width:100px m-3 p-3 border-black border-2">
      <div className="grow">
        <div>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white my-3">
            Sign in to our platform
          </h3>
          <form
            action={async (formData) => {
              "use server";
              await signIn("credentials", formData);
            }}
          >
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
            <div className="w-full">
              <Button type="submit">Sign In</Button>
            </div>
          </form>
          <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?&nbsp;
            <Link
              href="/register"
              className="text-cyan-700 hover:underline dark:text-cyan-500"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
