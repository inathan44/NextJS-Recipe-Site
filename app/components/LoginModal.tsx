'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { auth } from '@/firebaseConfig';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth';
import { useForm, SubmitHandler } from 'react-hook-form';
import { LoginSchema, loginSchema } from '../models/schema';
import SignUp from './SignInForm';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

type Props = {
  children: React.ReactNode;
};

export default function LoginModal({ children }: Props) {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);

  const [newUser, setNewUser] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

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
    <>
      <div className={`${!user?.email ? '' : 'hidden'}`}>
        <Dialog modal open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant='ghost' className='dark:hover:text-primary-light'>
              {children}
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle className='text-center'>
                {newUser ? 'Create Account' : 'Sign In'}
              </DialogTitle>

              {/* Modal description */}
              <DialogDescription className='text-center'>
                Create an account to add recipes, bookmark your favorites, and
                more.
              </DialogDescription>
            </DialogHeader>

            {/* Modal Content */}
            {newUser ? <SignUpForm /> : <SignInForm setOpen={setOpen} />}

            <DialogFooter>
              <button
                onClick={() => setNewUser((prev) => !prev)}
                className='text-left text-sm text-primary-dark dark:text-slate-200'
              >
                {!newUser ? (
                  <>
                    New here? Click{' '}
                    <span className='underline'>
                      here to create an account.
                    </span>
                  </>
                ) : (
                  <>
                    Already have an account? Click{' '}
                    <span className='underline'>here to sign in.</span>
                  </>
                )}
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
