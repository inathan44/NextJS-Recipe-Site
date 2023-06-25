'use client';
import { auth } from '@/firebaseConfig';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';

const AccountLink = () => {
  const [user] = useAuthState(auth);

  return (
    <Link
      className={`text-lg font-semibold dark:text-primary-light ${
        !user?.uid ? 'hidden' : ''
      }`}
      href={'/account'}
    >
      Account
    </Link>
  );
};

export default AccountLink;
