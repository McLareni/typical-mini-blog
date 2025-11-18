export function validateLogin(login: string, password: string) {
  if (!login || login.trim().length === 0) {
    return { valid: false, error: "Login is required." };
  }

  if (!password || password.trim().length === 0) {
    return { valid: false, error: "Password is required." };
  }

  return { valid: true };
}

export function validateRegistration(
  login: string,
  password: string,
  name: string,
  repassword: string
) {
  if (!login || login.trim().length === 0) {
    return { valid: false, error: "Login is required." };
  }

  if (login.trim().length < 4) {
    return { valid: false, error: "Login must be at least 4 characters long." };
  }

  if (login.trim().length > 20) {
    return {
      valid: false,
      error: "Login must be no more than 20 characters long.",
    };
  }

  if (password.trim().length < 6) {
    return {
      valid: false,
      error: "Password must be at least 6 characters long.",
    };
  }

  if (!password || password.trim().length === 0) {
    return { valid: false, error: "Password is required." };
  }
  if (!name || name.trim().length === 0) {
    return { valid: false, error: "Name is required." };
  }
  if (password !== repassword) {
    return { valid: false, error: "Passwords do not match." };
  }
  return { valid: true };
}
