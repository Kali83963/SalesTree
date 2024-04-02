export function validatePassword(password) {
    // Define validation criteria
    const minLength = 8; // Minimum length of the password
    const containsUppercase = /[A-Z]/.test(password); // Check if the password contains at least one uppercase letter
    const containsLowercase = /[a-z]/.test(password); // Check if the password contains at least one lowercase letter
    const containsNumber = /\d/.test(password); // Check if the password contains at least one digit
    const containsSpecialChar = /[^A-Za-z0-9]/.test(password); // Check if the password contains at least one special character

    // Validate the password
    if (password.length < minLength) {
        return "Password must be at least " + minLength + " characters long.";
    }
    if (!containsUppercase) {
        return "Password must contain at least one uppercase letter.";
    }
    if (!containsLowercase) {
        return "Password must contain at least one lowercase letter.";
    }
    if (!containsNumber) {
        return "Password must contain at least one digit.";
    }
    if (!containsSpecialChar) {
        return "Password must contain at least one special character.";
    }

    // If all criteria are met, the password is valid
    return true;
}
  

  