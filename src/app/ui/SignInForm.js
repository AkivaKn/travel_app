"use client";
import { Button } from "flowbite-react";
import Link from "next/link";
import { useState } from "react";
import { login } from "../lib/data/users";

export default function SignInForm() {
  const [errors, setErrors] = useState({});
  async function signInUser(formData) {
    const user = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const valid = validateForm(user);
    if (valid) {
      login(user);
    }
  }
  function validateForm({ email, password }) {
    let errors = {};
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?!.* ).{8,16}$/;
    if (!email) {
      errors.email = "Please provide your email address.";
    } else if (!emailRegex.test(email)) {
      errors.email = "Email is invalid.";
    }
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 8 || password.length > 16) {
      errors.password = "Password must be between 8 and 16 characters.";
    } else if (!passwordRegex.test(password)) {
      errors.password =
        "Password must contain at least one lowercase letter and one digit.";
    }
    setErrors(errors);
    if (errors.email || errors.password) {
      return false;
    } else {
      return true;
    }
  }
  return (
    <div className="h-screen flex max-height:100px max-width:100px m-3 p-3 border-black border-2">
      <div className="grow">
        <div>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white my-3">
            Sign in to our platform
          </h3>
          <form action={signInUser}>
            <div>
              <div className="mb-2 block">
                <label htmlFor="email">Email</label>
              </div>
              <input className="w-full" id="email" name="email" type="email" />
              {errors.email && <p>{errors.email}</p>}
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
              {errors.password && <p>{errors.password}</p>}
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
