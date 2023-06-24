'use client';
import { auth } from '@/firebaseConfig';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import HeartIcon from '@/app/components/HeartIcon';
import { isRecipeLiked, likeRecipe } from '@/app/utils/documentFunctions';
import LoginModal from '@/app/components/LoginModal';
const regex = /[^/]*$/;

type LikeProps = {
  recipeName: string;
  recipeImage: string;
};

const LikeRecipe = ({ recipeImage, recipeName }: LikeProps) => {
  const [user] = useAuthState(auth);
  const [recipeIsLiked, setRecipeIsLiked] = useState<boolean>(false);

  const pathname = usePathname();

  useEffect(() => {
    const match = pathname.match(regex);
    const runAsyncFunc = async () => {
      const bool = await isRecipeLiked(user?.uid || '', match ? match[0] : '');
      setRecipeIsLiked(bool);
    };

    if (user?.email) runAsyncFunc();
  }, [user, pathname]);

  async function handleClick() {
    const match = pathname.match(regex);
    const recipeId = match ? match[0] : '';

    if (recipeId && user?.uid) {
      try {
        await likeRecipe(recipeId, user?.uid, recipeName, recipeImage);

        const bool = await isRecipeLiked(
          user?.uid || '',
          match ? match[0] : ''
        );
        setRecipeIsLiked(bool);
      } catch (e) {
        console.log('error');
      }
    }
  }

  return (
    <>
      {user?.email ? (
        <button onClick={handleClick}>
          <HeartIcon liked={recipeIsLiked} />
        </button>
      ) : (
        <LoginModal>
          <HeartIcon />
        </LoginModal>
      )}
    </>
  );
};

export default LikeRecipe;
