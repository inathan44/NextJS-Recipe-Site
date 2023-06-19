'use client';
import { useAuthState } from 'react-firebase-hooks/auth';
import Link from 'next/link';
import { auth } from '@/firebaseConfig';

export default function LoginButton() {
  const [user, loading, error] = useAuthState(auth);

  return (
    <>
      <Link className={`${user?.email ? 'hidden' : ''}`} href={'/signin'}>
        Sign In
      </Link>
    </>
  );
}
