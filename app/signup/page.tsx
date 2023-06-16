'use client';
import { useEffect, useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from './components/InputField';
import { auth } from '@/firebaseConfig';
import { SignUpSchema, signUpSchema } from '../models/schema';
import { FIREBASE_ERRORS } from '@/lib/firebaseErrors';

export default function SignUp() {
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    control,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<SignUpSchema>({ resolver: zodResolver(signUpSchema) });

  const [createUserWithEmailAndPassword, _, loading, authError] =
    useCreateUserWithEmailAndPassword(auth);

  console.log('auth Error', authError?.message);

  const onSubmit: SubmitHandler<SignUpSchema> = async (data) => {
    // Valid form inputs

    await createUserWithEmailAndPassword(data.email, data.password);
  };

  useEffect(() => {
    if (!authError) reset();
  }, [authError, reset]);

  return (
    <div>
      <div className=' mx-3 min-h-[calc(100vh_-_204px)] justify-center pt-24 md:min-h-[calc(100vh_-_172px)]'>
        <p className='text-center text-red-400'>
          {FIREBASE_ERRORS[authError?.message as keyof typeof FIREBASE_ERRORS]}
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mx-auto flex max-w-sm flex-col gap-4'
        >
          <InputField
            label='Email'
            type='text'
            name='email'
            register={register}
            errors={errors}
          />
          <InputField
            label='Password'
            type='password'
            name='password'
            register={register}
            errors={errors}
          />
          <InputField
            label='Confirm Password'
            type='password'
            name='confirmPassword'
            errors={errors}
            register={register}
          />
          <button
            disabled={loading}
            className='rounded bg-primary-dark py-1 font-semibold disabled:bg-gray-300 disabled:text-gray-200 dark:bg-primary-light'
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
