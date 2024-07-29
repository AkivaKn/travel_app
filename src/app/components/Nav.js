"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
// import logo from "../assets/images/logo.svg"
// import profile from "../assets/icons/profile.svg"

export default function Nav({ session, signOut }) {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <nav className="flex-between p-10">
      <Link className="flex gap-2 flex-center" href="/">
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
      <div className= "hidden sm:flex items-center gap-8">
        <Link className="outline_btn" href="/plantrip">
          Plan Your Trip
        </Link>
        <Link className="outline_btn" href="/postitinerary">
          Post Itinerary
        </Link>
        {session?.user ? (
          <>
            <Link className="black_btn" href="/signout">
              Sign Out
            </Link>
            <div>
              <Image
                // src={session?.user.avatar_img_url}
                src="/assets/icons/profile.svg"
                alt="User Avatar"
                width={37}
                height={37}
              />
              <p className="text-red-500">{session?.user.username}</p>
            </div>
          </>
        ) : (
          <Link className="black_btn" href="/login">
            Sign In
          </Link>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="flex relative sm:hidden ">
        <Image
          src="/assets/icons/burger.svg"
          alt="Menu"
          width={37}
          height={37}
          onClick={() => {
            setToggleDropdown((prev) => !prev);
            console.log(toggleDropdown);
            console.log("dropdown is toggling");
          }}
        />
        {toggleDropdown && (
          session?.user ? (
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
              }}
              href="/signout"
              className="mt-5 w-full black_btn"
            >
              Sign Out
            </Link>
          </div>
          )
         : (
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

         )
        )}
      </div>
    </nav>
  );
}
