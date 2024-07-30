"use server"

import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt"
import { signOut } from "../../../../auth";


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

  export async function logout(){
    await signOut()
  }