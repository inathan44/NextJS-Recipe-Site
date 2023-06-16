'use client';

import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '@/firebaseConfig';

export default function SignOutButton() {
  const [signOut, loading, error] = useSignOut(auth);

  return (
    <button onClick={signOut} className='dark:bg-primary-light'>
      Sign out
    </button>
  );
}
