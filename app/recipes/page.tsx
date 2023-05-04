import React from 'react';
import Link from 'next/link';

import getAllRecipes from '@/lib/getAllRecipes';
import RecipeCard from '../components/RecipeCard';

export default async function Recipes() {
  const recipesData: Promise<Recipe[] | undefined> = getAllRecipes();

  const recipes = await recipesData;

  return (
    <div className='mx-auto flex max-w-7xl flex-wrap gap-x-8 gap-y-8'>
      {recipes?.map((recipe) => {
        return (
          <>
            <RecipeCard recipe={recipe} key={recipe.id} />
          </>
        );
      })}
    </div>
  );
}
