"use client";

import { postNewUser } from "../lib/data/users";
import { validateUserDetailsForm } from "../utils/validation_utils";
import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import ErrorAlert from "./ErrorAlert";


export default function RegisterForm({ modalRef, setToggleRegister }) {
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({});
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const postUser = async () => {
      try {
        await postNewUser(user);
        const modalElement = modalRef.current;
        modalElement.close();
        
      } catch (error) {
      setErrors({serverError:'Please try again.'})
        
      }
    };
    if (valid) {
      postUser();
    }
  }, [user]);

  function createUser(formData) {
    const newUser = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      bio: formData.get("bio"),
      avatar_img: formData.get("avatar_img"),
    };
    const confirmPassword = formData.get("confirmPassword");
    const formErrors = validateUserDetailsForm({ ...newUser, confirmPassword });
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setValid(true);
      setUser(formData);
    }
  }
  function handleClose() {
    const modalElement = modalRef.current;
    modalElement.close();
  }

  return (
    <div>
      <div className='grow'>
        <div className='flex justify-between text-xl mb-7'>
          <h3 className='font-satoshi font-semibold text-gray-700 '>
            Register
          </h3>
          <button onClick={handleClose}>
            <IoMdClose />
          </button>
        </div>

        <div>
          <form action={createUser} noValidate>
            <div>
              <div className='mb-2 block'>
                <label
                  className='font-satoshi font-semibold text-base text-gray-700'
                  htmlFor='username'>
                  Username
                </label>
              </div>
              <input
                className='form_input'
                id='username'
                name='username'
                type='text'
              />
              {errors.username && (
                <ErrorAlert
                  errors={errors}
                  setErrors={setErrors}
                  errorKey={"username"}
                />
              )}
            </div>
            <div className='my-3'>
              <div className='mb-2 block'>
                <label
                  className='font-satoshi font-semibold text-base text-gray-700'
                  htmlFor='email'>
                  Email
                </label>
              </div>
              <input
                className='form_input'
                id='email'
                name='email'
                type='email'
              />
              {errors.email && (
                <ErrorAlert
                  errors={errors}
                  setErrors={setErrors}
                  errorKey={"email"}
                />
              )}
            </div>
            <div className='my-3'>
              <div className='mb-2 block'>
                <label
                  className='font-satoshi font-semibold text-base text-gray-700'
                  htmlFor='password'>
                  Password
                </label>
              </div>
              <input
                className='form_input'
                id='password'
                name='password'
                type='password'
              />
              {errors.password && (
                <ErrorAlert
                  errors={errors}
                  setErrors={setErrors}
                  errorKey={"password"}
                />
              )}
            </div>
            <div className='my-3'>
              <div className='mb-2 block'>
                <label
                  htmlFor='confirmPassword'
                  className='font-satoshi font-semibold text-base text-gray-700'>
                  Confirm password
                </label>
              </div>
              <input
                className='form_input'
                id='confirmPassword'
                name='confirmPassword'
                type='password'
              />
              {errors.confirmPassword && (
                <ErrorAlert
                  errors={errors}
                  setErrors={setErrors}
                  errorKey={"confirmPassword"}
                />
              )}
            </div>
            <div>
              <div className='mb-2 block'>
                <label
                  className='font-satoshi font-semibold text-base text-gray-700'
                  htmlFor='bio'>
                  Bio
                </label>
              </div>
              <textarea
                className='form_textarea h-[100px]'
                id='bio'
                name='bio'></textarea>
              {errors.bio && (
                <ErrorAlert
                  errors={errors}
                  setErrors={setErrors}
                  errorKey={"bio"}
                />
              )}
            </div>
            <div className='my-3'>
              <div className='mb-2 block'>
                <label
                  className='font-satoshi font-semibold text-base text-gray-700'
                  htmlFor='avatar_img'>
                  Profile Picture (max 4.5mb)
                </label>
              </div>
              <input
                className=' text-sm text-grey-500
                file:mr-5 file:py-3 file:px-10
                file:rounded-full file:border-0
                file:text-md file:font-semibold  file:text-white
                file:bg-gradient-to-r file:from-blue-600 file:to-amber-600
                hover:file:cursor-pointer hover:file:opacity-80'
                id='avatar_img'
                name='avatar_img'
                type='file'
                accept='image/*'
              />
            </div>
            <div className='w-full mt-5 mb-3'>
            
               {errors.serverError && (
                <ErrorAlert
                  errors={errors}
                  setErrors={setErrors}
                  errorKey={"serverError"}
                />
              )}
              <button className="black_btn_large_text w-full"
                type='submit'>Register</button>
            </div>

          </form>
          <div className='flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300'>
            Already registered?&nbsp;
            <button
              onClick={() => {
                setToggleRegister(false);
              }}
              className='text-cyan-700 hover:underline dark:text-cyan-500'>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
