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
  recipeInfo: RecipeSnippet;
  likes: number;
};

const LikeRecipe = ({ recipeInfo, likes }: LikeProps) => {
  const [user] = useAuthState(auth);
  const [recipeIsLiked, setRecipeIsLiked] = useState<boolean>(false);
  const [clientLikes, setClientLikes] = useState<number>(likes);
  const [disabled, setDisabled] = useState<boolean>(false);

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
        setDisabled(true);
        await likeRecipe(recipeInfo, user.uid);

        const bool = await isRecipeLiked(
          user?.uid || '',
          match ? match[0] : ''
        );
        setRecipeIsLiked(bool);
        setClientLikes((prev) => {
          return prev + (bool ? 1 : -1);
        });
        setDisabled(false);
      } catch (e) {
        console.log('error');
        setDisabled(false);
      }
    }
  }

  return (
    <>
      {user?.email ? (
        <button className='' onClick={handleClick} disabled={disabled}>
          <HeartIcon liked={recipeIsLiked} likes={clientLikes} />
        </button>
      ) : (
        <LoginModal>
          <HeartIcon likes={clientLikes} />
        </LoginModal>
      )}
    </>
  );
};

export default LikeRecipe;
