'use client';
import { NextPage } from 'next';
import { useState } from 'react';
import { UserData } from '../api/handleForm/route';

interface Props {}

const FormContainer: NextPage<Props> = ({}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDOB] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({});
  const blocks = [1, 2, 3, 4];

  const sendToBackend = async (e) => {
    e.preventDefault();
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    } else {
        setErrors({})
    }

    const usData: UserData = {
      name: 'name',
      email: 'email',
      password: password,
      dateOfBirth: '12',
      phoneNumber: '05/06/1999',
      termsAccepted: true,
    };

    const response = await fetch('/api/handleForm', {
      method: 'POST',
      body: JSON.stringify({ data: usData }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }
  };

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!dob) newErrors.dateOfBirth = 'Date of birth is required';
    if (new Date().getFullYear() - new Date(dob).getFullYear() < 18)
      newErrors.dateOfBirth = 'You must be at least 18 years old';
    if (!phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!termsAccepted) newErrors.termsAccepted = 'You must accept the terms';

    return newErrors;
  };

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
  const handlePassword = (e) => {
    const newPassword = e.target.value;

    setPassword(newPassword);

    const { strength, validConditions } = validatePassword(newPassword);
    console.log(strength, validConditions);
    setPasswordStrength(strength);

    // const newErrors =
    // if (validConditions.length > 4) {
    // }
  };
  return (
    <form
      onSubmit={sendToBackend}
      className='h-full w-3/4 items-center rounded-xl p-5 border  space-y-6'
    >
      <div className='flex flex-col'>
        <label className='font-medium'>Name</label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='p-2 border rounded w-[30%]'
        />
        {errors.name && <p className='text-red-600 text-sm'>{errors.name}</p>}
      </div>

      <div className='flex flex-col space-y-2'>
        <label className='font-medium'>Email</label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='p-2 border rounded  w-[30%]'
        />
        {errors.email && <p className='text-red-600 text-sm'>{errors.email}</p>}
      </div>
      <div className='flex flex-col space-y-2'>
        <label className='font-medium'>Password</label>
        <input
          type='password'
          className='border px-3 py-1 w-[30%] rounded-md'
          placeholder='Enter password'
          value={password}
          onChange={handlePassword}
        />
        <div className='flex space-x-1 mt-1 max-w-[30%]'>
          {blocks.map((index) => (
            <div
              key={index}
              className={`w-1/4 h-1 ${
                passwordStrength === 'Very Weak'
                  ? 'bg-gray-300'
                  : passwordStrength === 'Weak'
                  ? 'bg-red-400'
                  : passwordStrength === 'so-so'
                  ? 'bg-yellow-300'
                  : passwordStrength === 'Good'
                  ? 'bg-green-300'
                  : passwordStrength === 'Strong'
                  ? 'bg-green-700'
                  : ''
              }`}
            />
          ))}
        </div>

        <div
          className={`text-sm ${
            passwordStrength === 'Very Weak'
              ? 'text-gray-300'
              : passwordStrength === 'Weak'
              ? 'text-red-400'
              : passwordStrength === 'so-so'
              ? 'text-yellow-300'
              : passwordStrength === 'Good'
              ? 'text-green-300'
              : passwordStrength === 'Strong'
              ? 'text-green-700'
              : ''
          }`}
        >
          {passwordStrength}
        </div>
      </div>
      <div className='flex flex-col space-y-2'>
        <label className='font-medium'>Date of Birth</label>
        <input
          type='date'
          value={dob}
          onChange={(e) => setDOB(e.target.value)}
          className='p-2 border rounded w-[30%]'
        />
        {errors.dateOfBirth && (
          <p className='text-red-600 text-sm'>{errors.dateOfBirth}</p>
        )}
      </div>

      <div className='flex flex-col space-y-2'>
        <label className='font-medium'>Phone Number</label>
        <input
          type='tel'
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className='p-2 border rounded w-[30%]'
        />
        {errors.phoneNumber && (
          <p className='text-red-600 text-sm'>{errors.phoneNumber}</p>
        )}
      </div>

      <div className='flex items-center space-x-2 '>
        <input
          type='checkbox'
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          className='p-2 border rounded'
        />
        <label className='font-medium mt-2'>Accept Terms and Conditions</label>
        {errors.termsAccepted && (
          <p className='text-red-600 text-sm'>{errors.termsAccepted}</p>
        )}
      </div>

      <button type='submit' className='px-3 py-3 rounded-md bg-blue-300'>Send</button>
    </form>
  );
};

export default FormContainer;
