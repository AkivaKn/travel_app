"use server";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
import { uploadImage } from "./images";
import { signIn, signOut, auth } from "../../../../auth";

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

export async function postNewUser(formData) {
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const bio = formData.get("bio");
  const avatar_img = formData.get("avatar_img");
  let avatar_img_url;
  if (avatar_img.size > 0) {
    avatar_img_url = await uploadImage(avatar_img);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const res = await sql`
            INSERT INTO users (username, email, password,  bio, avatar_img_url )
            VALUES (${username}, ${email}, ${hashedPassword}, ${bio}, ${avatar_img_url} );
        `;
  } catch (error) {
    console.error("Registration error:", error);
    return null;
  }
}

export async function resetPassword(newPassword) {
  const { user } = await auth();
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  try {
    await sql`
      UPDATE users
      SET password = ${hashedPassword}
      WHERE user_id = ${user.user_id}`;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function login(user) {
  await signIn("credentials", user);
}

export async function logout() {
  await signOut();
}

export async function updateUser(formData, avatarImageUrl, userId) {
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const bio = formData.get("bio");
  const avatar_img = formData.get("avatar_img");


  try {
    let sqlStr = `
    UPDATE users
    SET username = $1, email = $2, bio = $3, avatar_img_url = $4`;

    if (avatar_img.size > 0) {
      avatarImageUrl && del(avatarImageUrl);
      avatarImageUrl = await uploadImage(avatar_img);
    }

    let params = [username, email, bio, avatarImageUrl, userId];

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      sqlStr += `, password = $6`;
      params.push(hashedPassword);
    }

    sqlStr += ` WHERE user_id = $5
                RETURNING *`;

    const res = await sql.query(sqlStr, params);

    return res.rows[0];
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function checkPassword(email, password) {
  try {
    const res = await sql`
                  SELECT password FROM users where email = ${email};
              `;
    const user = res.rows[0];
    if (!(await bcrypt.compare(password, user.password))) {
      throw "Incorrect password";
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function deleteUser(email) {
  try {
    const res = await sql`
      DELETE FROM users
      WHERE email = ${email}
      RETURNING *`;
    if (res.rows.length === 0) {
      throw "500: Server error";
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
