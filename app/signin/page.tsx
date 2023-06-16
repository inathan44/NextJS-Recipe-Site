'use client';
import { useEffect, useState } from 'react';
import {
  useSignInWithEmailAndPassword,
  useAuthState,
} from 'react-firebase-hooks/auth';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '../signup/components/InputField';
import { auth } from '@/firebaseConfig';
import { loginSchema, LoginSchema } from '../models/schema';
import { FIREBASE_ERRORS } from '@/lib/firebaseErrors';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [user, authLoading, error] = useAuthState(auth);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  const [signInWithUserAndPassword, _, loading, authError] =
    useSignInWithEmailAndPassword(auth);

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    // Valid form inputs
    await signInWithUserAndPassword(data.email, data.password);
  };

  useEffect(() => {
    if (!authError) reset();
  }, [authError, reset]);

  useEffect(() => {
    if (user?.email) router.push('/');
  }, [user, router]);

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
          <button
            disabled={loading}
            className='rounded bg-primary-dark py-1 font-semibold disabled:bg-gray-300 disabled:text-gray-200 dark:bg-primary-light'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
