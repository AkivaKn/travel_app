"use client";
import { useEffect, useRef, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import {
  checkPassword,
  deleteUser,
  logout,
  updateUser,
} from "../lib/data/users";
import { useRouter } from "next/navigation";
import { validateUserDetailsForm } from "../utils/validation_utils";
import ErrorAlert from "./ErrorAlert";
import { getItineraries } from "../lib/data/itineraries";
import ItinerariesList from "./ItinerariesList";

export default function ProfilePage({ session}) {
  const [editProfile, setEditProfile] = useState(false);
  const [errors, setErrors] = useState({});
  const [dialogError, setDialogError] = useState({});
  const [itineraries,setItineraries] = useState([])
  const router = useRouter();
  const modalRef = useRef();
  const user = session?.user;

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
    const fetchItineraries = async () => {
      const itineraries = await getItineraries(undefined, user?.user_id);
      setItineraries(itineraries);
    };
    fetchItineraries();
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
    const password = formData.get("password");
    setDialogError({});
    try {
      await checkPassword(user?.email, password);
      await deleteUser(user?.email);
      await logout();
      router.replace("/");
    } catch (error) {
      setDialogError({ password: error.message });
    }
  };

  const cancelDelete = () => {
    const modalElement = modalRef.current;
    modalElement.close();
    setDialogError({});
  };

  return (
    <>
      <div className="flex justify-center">
        {/* <div className="flex w-1/2 p-2 bg-white rounded-xl shadow-lg mx-4 mb-8 flex-col p-6"> */}
        {editProfile ? (
          <div className="flex w-full">
            <form
              className="w-full flex p-2 bg-white rounded-xl shadow-lg mx-4 mb-8 flex-col p-6"
              action={handleSubmit}
              noValidate
            >
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
                  <ErrorAlert
                    errors={errors}
                    setErrors={setErrors}
                    errorKey={"username"}
                  />
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
                    htmlFor="profile-password"
                  >
                    Password (optional)
                  </label>
                </div>
                <input
                  className="form_input"
                  id="profile-password"
                  name="password"
                  type="password"
                  // placeholder="New password (optional)"
                />
                {errors.password && (
                  <ErrorAlert
                    errors={errors}
                    setErrors={setErrors}
                    errorKey={"password"}
                  />
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
                  <ErrorAlert
                    errors={errors}
                    setErrors={setErrors}
                    errorKey={"confirmPassword"}
                  />
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
                  <ErrorAlert
                    errors={errors}
                    setErrors={setErrors}
                    errorKey={"bio"}
                  />
                )}
              </div>
              <div className="flex mt-4">
                <button className="black_btn mr-2" type="submit">
                  Save Changes
                </button>
                <button
                  className="outline_btn"
                  onClick={() => setEditProfile(false)}
                >
                  Cancel
                </button>
              </div>
              {errors.serverError && (
                <ErrorAlert
                  errors={errors}
                  setErrors={setErrors}
                  errorKey={"serverError"}
                />
              )}
            </form>
          </div>
        ) : (
          <div className={`w-full ${itineraries.length >0 &&`md:grid grid-cols-3`} md:p-8`}>
            <div className="flex flex-col justify-center items-center h-[80vh]">
              <img
                className="w-48 h-48 rounded-full object-cover my-3"
                src={
                  user?.avatar_img_url
                    ? user?.avatar_img_url
                    : `https://ui-avatars.com/api?name=${user?.username}&rounded=true&background=random`
                }
                alt="user profile image"
              />
              <h1 className="sm:text-xl text-lg font-semibold my-3">
                {user?.username}
              </h1>
                <p className="sm:text-lg text-sm my-3">{user?.email}</p>
                <p className="sm:text-lg text-sm text-gray-900 p-4">
                {user?.bio}
                </p>
              <div className="flex my-3">
                <button
                  className="black_btn "
                  onClick={() => setEditProfile(true)}
                >
                  Edit Profile
                </button>
                <button className="red_btn" onClick={handleDeleteClick}>
                  Delete account
                </button>
              </div>
              </div>
              {itineraries.length > 0 &&
            <div className="col-start-2 col-span-2 justify-center items-center md:bg-white md:rounded-xl md:shadow-lg">
              
                <ItinerariesList session={session} itineraries={itineraries}/>
            </div>
              }
          </div>
        )}
      </div>
      {/* </div> */}
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
            <label htmlFor="password">Confirm your password</label>
            <input name="password" id="password" type="password"></input>
            {dialogError.password && (
              <ErrorAlert
                errors={dialogError}
                setErrors={setDialogError}
                errorKey={"password"}
              />
            )}
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
