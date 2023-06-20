'use client';

import { useSignOut, useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebaseConfig';
import { Button } from '@/components/ui/button';
import SignUp from './SignInForm';
import LoginModal from './LoginModal';

export default function LoginLogoutButton() {
  const [signOut, loading, error] = useSignOut(auth);
  const [user, _, $] = useAuthState(auth);

  return (
    <>
      {user?.email ? (
        <Button
          onClick={signOut}
          variant={'ghost'}
          className='hover:text-primary-light'
        >
          Log out
        </Button>
      ) : (
        <LoginModal />
      )}
    </>
  );
}
