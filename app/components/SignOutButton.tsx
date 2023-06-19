'use client';

import { useSignOut, useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebaseConfig';

export default function SignOutButton() {
  const [signOut, loading, error] = useSignOut(auth);
  const [user, _, $] = useAuthState(auth);

  return (
    <>
      {user?.email && (
        <button
          onClick={signOut}
          className={`${
            user?.email ? '' : 'hidden'
          } hidden rounded-full px-4 font-semibold dark:bg-primary-light md:block`}
        >
          Sign out
        </button>
      )}
    </>
  );
}
