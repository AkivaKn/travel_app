import { put } from "@vercel/blob";

export async function uploadImage(imageFile) {
  const blob = await put(imageFile.name, imageFile, {
    access: "public",
  });
  return blob.url;
}

export function validateSignInForm({ email, password }) {
  let errors = {};
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?!.* ).{8,16}$/;
  if (!email) {
    errors.email = "Please provide your email address.";
  } else if (!emailRegex.test(email) || email.length > 20) {
    errors.email = "Email is invalid.";
  }
  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 8 || password.length > 16) {
    errors.password = "Password must be between 8 and 16 characters.";
  } else if (!passwordRegex.test(password)) {
    errors.password =
      "Password must contain at least one lowercase letter and one digit.";
  }
  return errors;
}

export function validateRegisterForm({
  username,
  email,
  password,
  confirmPassword,
  bio,
}) {
  let errors = {};
  const usernameRegex = /^[\w]+$/;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?!.* ).{8,16}$/;

  if (!username) {
    errors.username = "Please enter a username.";
  } else if (username.length < 5 || username.length > 20) {
    errors.username = "Username must be between 5 and 20 characters.";
  } else if (!usernameRegex.test(username)) {
    errors.username = "Username must only contain alphanumeric characters.";
  }

  if (!email) {
    errors.email = "Please provide your email address.";
  } else if (!emailRegex.test(email) || email.length > 20) {
    errors.email = "Email is invalid.";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password !== confirmPassword) {
    errors.password = "Passwords must match.";
  } else if (password.length < 8 || password.length > 16) {
    errors.password = "Password must be between 8 and 16 characters.";
  } else if (!passwordRegex.test(password)) {
    errors.password =
      "Password must contain at least one lowercase letter and one digit.";
  }

  if (bio.length > 1000) {
    errors.bio = "Bio must be less than 1000 characters.";
  }

  return errors;
}
