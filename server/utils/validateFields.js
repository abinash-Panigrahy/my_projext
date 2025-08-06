// utils/validateFields.js

/**
 * Checks if required fields are present in an object.
 * @param {object} data - The object to check.
 * @param {string[]} requiredFields - An array of field names that are required.
 * @returns {string|null} - Returns an error message if a field is missing, otherwise null.
 */
export const validateRequiredFields = (data, requiredFields) => {
  for (const field of requiredFields) {
    if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
      return `Missing required field: ${field}`;
    }
  }
  return null;
};

/**
 * Checks if an email is valid.
 * @param {string} email - The email string to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Checks if a password meets minimum length requirements.
 * @param {string} password - The password string to validate.
 * @param {number} minLength - The minimum required length.
 * @returns {boolean} - True if valid, false otherwise.
 */
export const isValidPassword = (password, minLength = 6) => {
  return typeof password === 'string' && password.length >= minLength;
};