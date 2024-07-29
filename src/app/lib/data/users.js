'use server'
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
import { redirect } from 'next/navigation';
import { NextResponse } from "next/server";
import { uploadImage } from "./utils";
import { signIn } from "../../../../auth";


export async function getUserFromDb(email, password) {
    try {
      const res = await sql`
              SELECT * FROM users where email = ${email};
          `;
        const user = res.rows[0];
      if (!user) {
        throw new Error("user not found");
      }
      if (!(await bcrypt.compare(password, user.password))) {
        throw new Error("invalid password");
      }
      return {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        avatar_img_url: user.avatar_img_url,
      };
        
    } catch (error) {
      console.error("Authorisation error:", error);
      return null;
    }
}
  
export async function postNewUser(user) {
  const { username, email, password, bio, avatar_img } = user;
  console.log(avatar_img);
  const avatar_img_url = await uploadImage(avatar_img);
  console.log(avatar_img_url);
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const res = await sql`
            INSERT INTO users (username, email, password,  bio, avatar_img_url )
            VALUES (${username}, ${email}, ${hashedPassword},  ${bio}, ${avatar_img_url} );
        `;
  } catch (error) {
    console.error("Registration error:", error);
    return null;
  }
}

export async function login(user) {
  await signIn("credentials", user);
}