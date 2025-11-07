//Used to validate inputs like email, password, or profile info before sending them to the backend.

// utils/validation.js

export function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function isValidPassword(password) {
  // at least 6 characters
  return password.length >= 6;
}

export function isNonEmpty(text) {
  return text.trim().length > 0;
}