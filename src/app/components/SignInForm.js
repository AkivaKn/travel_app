"use client";

import { useState } from "react";
import { login } from "../lib/data/users";
import { validateSignInForm } from "../utils/validation_utils";
import { IoMdClose } from "react-icons/io";
import ErrorAlert from "./ErrorAlert";

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
                <ErrorAlert
                  errors={errors}
                  setErrors={setErrors}
                  errorKey={"email"}
                />
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
                <ErrorAlert
                  errors={errors}
                  setErrors={setErrors}
                  errorKey={"password"}
                />
              )}
            </div>
            <div className="w-full mt-5 mb-3">
              <button className="black_btn_large_text w-full" type="submit">
                Sign In
              </button>
              {errors.serverError && (
                <ErrorAlert
                  errors={errors}
                  setErrors={setErrors}
                  errorKey={"serverError"}
                />
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
