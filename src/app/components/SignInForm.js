"use client";
import { Button } from "flowbite-react";
import Link from "next/link";
import { useState } from "react";
import { login } from "../lib/data/users";
import { validateSignInForm } from "../utils/validation_utils";
import { IoMdClose } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";

export default function SignInForm({ modalRef, setToggleRegister }) {
  const [errors, setErrors] = useState({});
  async function signInUser(formData) {
    try {
      const user = {
        email: formData.get("email"),
        password: formData.get("password"),
      };
      const formErrors = validateSignInForm(user);
      if (formErrors.email || formErrors.password) {
        setErrors(formErrors);
      } else {
        await login(user);
        const modalElement = modalRef.current;
        modalElement.close();
      }
    } catch (error) {
      setErrors({ serverError: "Please try again." });
    }
  }

  function handleClose() {
    const modalElement = modalRef.current;
    modalElement.close();
  }

  return (
    <div>
      <div className="grow">
        <div className="flex justify-between text-xl mb-7">
          <h3 className="font-satoshi font-semibold text-gray-700 ">Sign in</h3>
          <button onClick={handleClose}>
            <IoMdClose />
          </button>
        </div>
        <div>
          <form action={signInUser} noValidate>
            <div>
              <div className="mb-2 block">
                <label
                  className="font-satoshi font-semibold text-base text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
              </div>
              <input
                className="form_input"
                id="email"
                name="email"
                type="email"
              />
              {errors.email && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-1 mt-1 rounded relative"
                  role="alert"
                >
                  <strong className="font-bold">Error! </strong>
                  <span className="block sm:inline">{errors.email}</span>
                  <button
                    className="absolute top-0 bottom-0 right-0 px-2"
                    onClick={() => {
                      setErrors(() => {
                        let newErrors = { password: errors.password };
                        return newErrors;
                      });
                    }}
                  >
                    <MdOutlineClose />
                  </button>
                </div>
              )}
            </div>
            <div className="my-3">
              <div className="mb-2 block">
                <label
                  className="font-satoshi font-semibold text-base text-gray-700"
                  htmlFor="password"
                >
                  Password
                </label>
              </div>
              <input
                className="form_input"
                id="password"
                name="password"
                type="password"
              />

              {errors.password && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-1 mt-1 rounded relative"
                  role="alert"
                >
                  <strong className="font-bold">Error! </strong>
                  <span className="block sm:inline">{errors.password}</span>
                  <button
                    className="absolute top-0 bottom-0 right-0 px-2"
                    onClick={() => {
                      setErrors(() => {
                        let newErrors = { email: errors.email };
                        return newErrors;
                      });
                    }}
                  >
                    <MdOutlineClose />
                  </button>
                </div>
              )}
            </div>
            <div className="w-full mt-5 mb-3">
              <button className="black_btn_large_text w-full" type="submit">
                Sign In
              </button>
              {errors.serverError && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-1 mt-1 rounded relative"
                  role="alert"
                >
                  <strong className="font-bold">Error! </strong>
                  <span className="block sm:inline">{errors.serverError}</span>
                  <button
                    className="absolute top-0 bottom-0 right-0 px-2"
                    onClick={() => {
                      setErrors(() => {
                        let newErrors = { ...errors };
                        delete newErrors.serverError;
                        return newErrors;
                      });
                    }}
                  >
                    <MdOutlineClose />
                  </button>
                </div>
              )}
            </div>
          </form>
          <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?&nbsp;
            <button
              onClick={() => {
                setToggleRegister(true);
              }}
              className="text-cyan-700 hover:underline dark:text-cyan-500"
            >
              Create account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
