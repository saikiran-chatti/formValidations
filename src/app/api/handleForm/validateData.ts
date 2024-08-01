import { UserData } from "./route";

export const validateUserData = (userData: UserData) => {
    if (!userData.name) return 'Name is required';
    if (!userData.email) return 'Email is required';
    if (!userData.password) return 'Password is required';
    if (!userData.dateOfBirth) return 'Date of birth is required';
    if (new Date().getFullYear() - new Date(userData.dateOfBirth).getFullYear() < 18)
        return 'You must be at least 18 years old';
    if (!userData.phoneNumber) return 'Phone number is required';
    if (!userData.termsAccepted) return 'You must accept the terms';

    const { strength, validConditions } = validatePassword(userData.password);
    if (validConditions.length <4) {
        return 'Password conditions does not meet';
    }
    return null;
}

const validatePassword = (password: string) => {
    let strength = '';

    const conditions = [
      { regex: /[A-Z]/, message: 'Atleast one uppercase character' },
      { regex: /.{8,}/, message: 'At least 8 characters long' },
      { regex: /[\W_]/, message: 'At least one special character' },
      { regex: /\d/, message: 'At least one number' },
    ];

    const validConditions = conditions.filter((cond) =>
      cond.regex.test(password)
    );

    strength = ['Very Weak', 'Weak', 'so-so', 'Good', 'Strong'][
      validConditions.length
    ];

    return { strength, validConditions };
  };