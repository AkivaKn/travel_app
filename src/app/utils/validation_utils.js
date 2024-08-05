export function validateSignInForm({ email, password }) {
  let errors = {};
  const emailRegex = /^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?!.* ).{8,16}$/;
  if (!email) {
    errors.email = "Please provide your email address.";
  } else if (!emailRegex.test(email) || email.length > 320) {
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
  const emailRegex = /^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/;
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
  } else if (!emailRegex.test(email) || email.length > 320) {
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

export function validateItinerariesForm(title, days) {
  let errors = {};
  errors.days = [];

  if (!title) {
    errors.title = "Please enter a title";
  } else if (title.length > 50) {
    errors.title = "Title must be less than 50 characters";
  }

  days.map((day, index) => {
    if (!day.dayPlan) {
      const dayError = { index, dayPlan: "Please enter a day plan" };
      errors.days.push(dayError);
    }
    if (day.accomodation && day.accomodation.length > 150) {
      const dayError = {
        index,
        accomodation: "Accomodation must be less than 150 characters",
      };
      errors.days.push(dayError);
    }
    if (day.transport && day.transport.length > 150) {
      const dayError = {
        index,
        transport: "Transport must be less than 150 characters",
      };
      errors.days.push(dayError);
    }
    if (!day.country) {
      const dayError = { index, country: "Please enter a country" };
      errors.days.push(dayError);
    }
    if (!day.region) {
      const dayError = { index, region: "Please enter a region" };
      errors.days.push(dayError);
    }

    if (day.city && day.city.length > 150) {
      const dayError = {
        index,
        city: "City must be less than 150 characters",
      };
      errors.days.push(dayError);
    }
  });
  return errors;
}
