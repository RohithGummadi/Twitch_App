export default function validateUsername(username) {
    const regex = /^\S{3,8}$/;

    return regex.test(username)
}

export const usernameValidationMessage = "Username should have between 3 to 8 characters. No spaces allowed"