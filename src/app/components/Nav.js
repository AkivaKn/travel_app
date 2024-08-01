"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { logout } from "../lib/data/users";
// import logo from "../assets/images/logo.svg"
// import profile from "../assets/icons/profile.svg"

export default function Nav({ session, signOut }) {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <nav className="flex pt-5 px-5 mb-5">
      <Link className="flex gap-2 flex-start sm:justify-center sm:ml-[8%] w-96" href="/">
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
        <Link className="outline_btn w-[25%] max-w-48 " href="/postitinerary">
          Post Itinerary
        </Link>

        {session?.user ? (
          <form className="w-[25%] max-w-48" action={logout}>
            <button className="black_btn w-[100%]">Sign Out</button>
          </form>
        ):
        <Link className="black_btn w-[25%] max-w-48" href="/login">
          Sign In
        </Link>}
      </div>

      {session?.user && (
        <div className="hidden sm:flex absolute flex-col items-center ml-[1%] w-min-fit">
          <Image
            src="/assets/icons/profile.svg"
            alt="User Avatar"
            width={25}
            height={25}
          />
          <p className="text-red-500">{session?.user.username}</p>
        </div>
      )}

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
                href="/postitineray"
                className="dropdown_link"
                onClick={() => setToggleDropdown(false)}
              >
                Post Itinerary
              </Link>
              <Link
                type="button"
                onClick={() => {
                  setToggleDropdown(false);
                  // logout()
                }}
                href="/signout"
                className="mt-5 w-full black_btn"
              >
                Sign Out
              </Link>
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
                href="/postitineray"
                className="dropdown_link"
                onClick={() => setToggleDropdown(false)}
              >
                Post Itinerary
              </Link>
              <Link
                type="button"
                onClick={() => {
                  setToggleDropdown(false);
                }}
                href="/login"
                className="mt-5 w-full black_btn"
              >
                Sign In
              </Link>
            </div>
          ))}
      </div>
    </nav>
  );
}
