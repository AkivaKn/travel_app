"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { logout } from "../lib/data/users";
import SignInForm from "./SignInForm";
import RegisterForm from "./RegisterForm"

export default function Nav({ session, signOut }) {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [toggleRegister, setToggleRegister] = useState(false)
  
  const modalRef = useRef()
  const handleSignInClick = () =>{
    const modalElement = modalRef.current;
    modalElement.showModal();
    setToggleDropdown(false)
  }

  return (
    <nav className="flex pt-5 px-5 mb-5">
      <Link
        className="flex gap-2 flex-start sm:justify-center sm:ml-[8%] w-96"
        href="/"
      >
        <Image
          src="/assets/images/logo.svg"
          alt="WhereToGo logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">WhereToGo</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex w-full justify-evenly">
        <Link className="outline_btn w-[25%] max-w-48 " href="/plantrip">
          Plan Your Trip
        </Link>
        {session?.user ? (
          <Link
            className="outline_btn w-[25%] max-w-48 "
            href="/itinerary/post"
          >
            Post Itinerary
          </Link>
        ) : (
          <button
            className="outline_btn w-[25%] max-w-48 "
            onClick={handleSignInClick}
          >
            Post Itinerary
          </button>
        )}

        {session?.user ? (
          <form className="w-[25%] max-w-48" action={logout}>
            <button className="black_btn w-[100%]">Sign Out</button>
          </form>
        ) : (
          <button
            className="black_btn w-[25%] max-w-48"
            onClick={handleSignInClick}
          >
            Sign In
          </button>
        )}
      </div>

      {session?.user && (
        <div className="hidden sm:flex absolute flex-col items-center ml-[1%] w-min-fit">
          <img
            src={
              session.user.avatar_img_url
                ? session.user.avatar_img_url
                : `https://ui-avatars.com/api?name=${session.user.username}&rounded=true&background=random`
            }
            alt="User Avatar"
            width={35}
            height={35}
          />
          <p className="text-red-500">{session?.user.username}</p>
        </div>
      )}

      <dialog
        ref={modalRef}
        className="w-[80%] sm:w-[50%] relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5"
      >
        {toggleRegister ? (
          <RegisterForm
            modalRef={modalRef}
            setToggleRegister={setToggleRegister}
          />
        ) : (
          <SignInForm
            modalRef={modalRef}
            setToggleRegister={setToggleRegister}
          />
        )}
      </dialog>

      {/* Mobile Navigation */}
      <div className="absolute right-4 sm:hidden">
        <Image
          src="/assets/icons/burger.svg"
          alt="Menu"
          width={37}
          height={37}
          onClick={() => {
            setToggleDropdown((prev) => !prev);
          }}
        />
        {toggleDropdown &&
          (session?.user ? (
            <div className="dropdown">
              <Link
                href="/profile"
                className="dropdown_link"
                onClick={() => setToggleDropdown(false)}
              >
                View Profile
              </Link>
              <Link
                href="/plantrip"
                className="dropdown_link"
                onClick={() => setToggleDropdown(false)}
              >
                Plan Your Trip
              </Link>
              <Link
                href="/itinerary/post"
                className="dropdown_link"
                onClick={() => setToggleDropdown(false)}
              >
                Post Itinerary
              </Link>
              <form
                action={() => {
                  logout();
                  setToggleDropdown(false);
                }}
              >
                <button className="mt-5 w-full black_btn">Sign Out</button>
              </form>
            </div>
          ) : (
            <div className="dropdown">
              <Link
                href="/plantrip"
                className="dropdown_link"
                onClick={() => setToggleDropdown(false)}
              >
                Plan Your Trip
              </Link>
              <Link
                href="/itinerary/post"
                className="dropdown_link"
                onClick={() => setToggleDropdown(false)}
              >
                Post Itinerary
              </Link>
              <button
                type="button"
                onClick={handleSignInClick}
                className="mt-5 w-full black_btn"
              >
                Sign In
              </button>
            </div>
          ))}
      </div>
    </nav>
  );
}
