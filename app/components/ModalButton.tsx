'use client';

import { useSignOut, useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebaseConfig';
import { Button } from '@/components/ui/button';
import SignUp from './SignInForm';
import LoginModal from './LoginModal';
import HeartIcon from './HeartIcon';
import LikeRecipe from '../recipes/[recipeId]/components/LikeRecipe';

export default function LoginLogoutButton() {
  const [signOut, loading, error] = useSignOut(auth);
  const [user, _, $] = useAuthState(auth);

  return (
    <>
      <LoginModal>
        <HeartIcon />
      </LoginModal>
    </>
  );
}
