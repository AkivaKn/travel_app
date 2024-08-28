"use client";
import { useEffect, useRef, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { checkPassword, deleteUser, logout, updateUser } from "../lib/data/users";
import { useRouter } from "next/navigation";
import { validateUserDetailsForm } from "../utils/validation_utils";

export default function ProfilePage({ user }) {
  const [editProfile, setEditProfile] = useState(false);
  const [errors, setErrors] = useState({});
  const [dialogError, setDialogError] = useState({});
  const router = useRouter();
  const modalRef = useRef();


  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, []);
  async function handleSubmit(formData) {
    try {
      const updatedUser = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        bio: formData.get("bio"),
        avatar_img: formData.get("avatar_img"),
        confirmPassword: formData.get("confirmPassword"),
      };

      const formErrors = validateUserDetailsForm(updatedUser, false);
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
      } else {
        await updateUser(formData, user?.avatar_img_url, user?.user_id);
        await logout();
        router.replace("/");
        setEditProfile(false);
        setErrors({});
      }
    } catch (error) {
      setErrors({ serverError: "Please try again." });
    }
  }

  const handleDeleteClick = () => {
    const modalElement = modalRef.current;
    modalElement.showModal();
  };

  const handleDelete = async (formData) => {
    const password = formData.get("password")
    setDialogError({});
    try {
      await checkPassword(user?.email, password)
      await deleteUser(user?.email)
      await logout()
      router.replace("/");
    } catch (error) {
      console.log(error);
      setDialogError({password: error});
    }
  };

  const cancelDelete = () => {
    const modalElement = modalRef.current;
    modalElement.close();
    setDialogError({});
  };

  return (
    <>
      <div className="flex justify-center ">
        <div className="flex w-1/2 p-2 bg-white rounded-xl shadow-lg mx-4 mb-8  flex-col">
          <div className="flex justify-end border-2 border-black">
            <button
              className="black_btn "
              onClick={() => setEditProfile(!editProfile)}
            >
              {editProfile ? "Cancel" : "Edit Profile"}
            </button>
          </div>
          <div className="flex w-full items-center border-2 border-black flex-col">
            {editProfile ? (
              <form action={handleSubmit} noValidate>
                <div className="my-3">
                  <div className="mb-2 block">
                    <label
                      className="font-satoshi font-semibold text-base text-gray-700"
                      htmlFor="avatar_img"
                    >
                      Profile Picture (max 4.5mb)
                    </label>
                  </div>
                  <input
                    className=" text-sm text-grey-500
                  file:mr-5 file:py-3 file:px-10
                  file:rounded-full file:border-0
                  file:text-md file:font-semibold  file:text-white
                  file:bg-gradient-to-r file:from-blue-600 file:to-amber-600
                  hover:file:cursor-pointer hover:file:opacity-80"
                    id="avatar_img"
                    name="avatar_img"
                    type="file"
                    accept="image/*"
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <label
                      className="font-satoshi font-semibold text-base text-gray-700"
                      htmlFor="username"
                    >
                      Username
                    </label>
                  </div>
                  <input
                    className="form_input"
                    id="username"
                    name="username"
                    type="text"
                    defaultValue={user?.username}
                  />
                  {errors.username && (
                    <div
                      className="bg-red-100 border border-red-400 text-red-700 px-4 py-1 mt-1 rounded relative"
                      role="alert"
                    >
                      <strong className="font-bold">Error! </strong>
                      <span className="block sm:inline">{errors.username}</span>
                      <button
                        className="absolute top-0 bottom-0 right-0 px-2"
                        onClick={() => {
                          setErrors(() => {
                            let newErrors = { ...errors };
                            delete newErrors.username;
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
                    defaultValue={user?.email}
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
                            let newErrors = { ...errors };
                            delete newErrors.email;
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
                    // placeholder="New password (optional)"
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
                            let newErrors = { ...errors };
                            delete newErrors.password;
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
                      htmlFor="confirmPassword"
                      className="font-satoshi font-semibold text-base text-gray-700"
                    >
                      Confirm password
                    </label>
                  </div>
                  <input
                    className="form_input"
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                  />
                  {errors.confirmPassword && (
                    <div
                      className="bg-red-100 border border-red-400 text-red-700 px-4 py-1 mt-1 rounded relative"
                      role="alert"
                    >
                      <strong className="font-bold">Error! </strong>
                      <span className="block sm:inline">
                        {errors.confirmPassword}
                      </span>
                      <button
                        className="absolute top-0 bottom-0 right-0 px-2"
                        onClick={() => {
                          setErrors(() => {
                            let newErrors = { ...errors };
                            delete newErrors.confirmPassword;
                            return newErrors;
                          });
                        }}
                      >
                        <MdOutlineClose />
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <div className="mb-2 block">
                    <label
                      className="font-satoshi font-semibold text-base text-gray-700"
                      htmlFor="bio"
                    >
                      Bio
                    </label>
                  </div>
                  <textarea
                    className="form_textarea h-[100px]"
                    id="bio"
                    name="bio"
                    defaultValue={user?.bio}
                  ></textarea>
                  {errors.bio && (
                    <div
                      className="bg-red-100 border border-red-400 text-red-700 px-4 py-1 mt-1 rounded relative"
                      role="alert"
                    >
                      <strong className="font-bold">Error! </strong>
                      <span className="block sm:inline">{errors.bio}</span>
                      <button
                        className="absolute top-0 bottom-0 right-0 px-2"
                        onClick={() => {
                          setErrors(() => {
                            let newErrors = { ...errors };
                            delete newErrors.bio;
                            return newErrors;
                          });
                        }}
                      >
                        <MdOutlineClose />
                      </button>
                    </div>
                  )}
                </div>
                <button className="black_btn" type="submit">
                  Save Changes
                </button>
                {errors.serverError && (
                  <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-1 mt-1 rounded relative"
                    role="alert"
                  >
                    <strong className="font-bold">Error! </strong>
                    <span className="block sm:inline">
                      {errors.serverError}
                    </span>
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
              </form>
            ) : (
              <>
                <img
                  className="w-48 h-48 rounded-full object-cover"
                  src={
                    user?.avatar_img_url
                      ? user?.avatar_img_url
                      : `https://ui-avatars.com/api?name=${user?.username}&rounded=true&background=random`
                  }
                  alt="user profile image"
                />
                <h1 className="sm:text-xl text-lg font-semibold">
                  {user?.username}
                </h1>
                <p className="form_input sm:text-lg text-sm">{user?.email}</p>
                <div className="mb-2 block">
                  <h2 className="font-satoshi font-semibold text-gray-700">
                    Bio
                  </h2>
                </div>
                <p
                  className="
          sm:text-lg
          text-sm
          text-gray-900"
                >
                  {user?.bio}
                </p>
                <button className="red_btn" onClick={handleDeleteClick}>
                  Delete account
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <dialog
        ref={modalRef}
        className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5"
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <button
            type="button"
            onClick={cancelDelete}
            className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <form action={handleDelete}>
            <label htmlFor="password">Enter your password</label>
            <input name="password" id="password" type="password"></input>
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={cancelDelete}
                type="button"
                className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
