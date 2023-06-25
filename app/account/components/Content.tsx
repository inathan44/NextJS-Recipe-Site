'use client';

import { useEffect, useState } from 'react';
import { getRecipesByField, getUser } from '@/app/utils/documentFunctions';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebaseConfig';
import RecipeCard from '@/app/recipes/components/RecipeCard';
import { useRouter } from 'next/navigation';

const Content = () => {
  const [authUser] = useAuthState(auth);
  const [mounted, setMounted] = useState<boolean>(false);
  const [likedRecipes, setLikedRecipes] = useState<RecipeSnippet[]>([]);
  const [ownedRecipes, setOwnedRecipes] = useState<RecipeSnippet[]>([]);
  const [user, setUser] = useState<any>({});
  const [selection, setSelection] = useState<string>('likes');
  const router = useRouter();

  useEffect(() => {
    if (mounted && !authUser?.uid) {
      router.push('/');
    }
  }, [router, mounted, authUser]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (authUser?.email) {
      const asyncFunc = async () => {
        setLikedRecipes(await getRecipesByField(authUser.uid, 'likes'));
        setOwnedRecipes(await getRecipesByField(authUser.uid, 'myRecipes'));
        setUser(await getUser(authUser.uid));
      };
      asyncFunc();
    }
  }, [authUser]);

  return (
    <div className='flex flex-col-reverse gap-8 sm:flex-row'>
      <div className='max-w-5xl'>
        {/* <h1 className='text-center text-xl font-bold'>Liked Recipes</h1> */}
        <div className='flex justify-center gap-8 text-sm '>
          <button
            onClick={() => setSelection('likes')}
            className={`w-32 rounded-full border border-primary-dark py-1 font-semibold dark:border-primary-light ${
              selection === 'likes'
                ? 'bg-primary-dark text-primary-light dark:bg-primary-light dark:text-primary-dark'
                : ''
            }`}
          >
            Liked Recipes
          </button>
          <button
            onClick={() => setSelection('myRecipes')}
            className={`w-32 rounded-full border border-primary-dark font-semibold dark:border-primary-light ${
              selection === 'myRecipes'
                ? 'bg-primary-dark text-primary-light dark:bg-primary-light dark:text-primary-dark'
                : ''
            }`}
          >
            My Recipes
          </button>
        </div>
        <div className='my-4 grid grid-cols-1 place-items-center justify-center gap-x-4 gap-y-8 px-4 md:grid-cols-2 lg:grid-cols-3'>
          {selection === 'likes' ? (
            likedRecipes.map((recipe, idx) => (
              <RecipeCard recipe={recipe} key={idx} />
            ))
          ) : (
            <>
              {ownedRecipes.map((recipe, idx) => (
                <RecipeCard recipe={recipe} key={idx} />
              ))}
            </>
          )}
        </div>
      </div>
      <div className='flex justify-center'>
        <p>username: {user.email}</p>
      </div>
    </div>
  );
};

export default Content;
