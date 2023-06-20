// 'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from './InputField';
import { loginSchema, LoginSchema } from '../models/schema';
import { FIREBASE_ERRORS } from '@/lib/firebaseErrors';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebaseConfig';

type Props = {
  setOpen: any;
};

export default function SignInForm({ setOpen }: Props) {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  const [authUser] = useAuthState(auth);

  useEffect(() => {
    if (authUser) setOpen(false);
  }, [authUser, setOpen]);

  const [signInWithUserAndPassword, _, loading, authError] =
    useSignInWithEmailAndPassword(auth);

  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);

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
      <div className='mx-3 justify-center'>
        <p className='text-center text-red-400'>{googleError?.message}</p>
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
            className='rounded bg-primary-dark py-2 font-semibold text-primary-light disabled:bg-gray-300 disabled:text-gray-200 dark:bg-primary-light dark:text-primary-dark'
          >
            Login
          </button>
        </form>
        <button
          onClick={() => signInWithGoogle()}
          className='mx-auto mt-4 flex w-full max-w-sm justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-700 transition duration-150 hover:border-slate-400 hover:text-slate-900 hover:shadow'
        >
          <Image
            className='h-6 w-6'
            src='https://www.svgrepo.com/show/475656/google-color.svg'
            loading='lazy'
            alt='google logo'
            width={800}
            height={800}
          />
          <span>Login with Google</span>
        </button>
      </div>
    </div>
  );
}
