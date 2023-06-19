'use client';
import { useAuthState } from 'react-firebase-hooks/auth';
import Link from 'next/link';
import { auth } from '@/firebaseConfig';

const SignupButton = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <>
      <Link className={`${user?.email ? 'hidden' : ''}`} href={'/signup'}>
        Sign Up
      </Link>
    </>
  );
};

export default SignupButton;
