import React from 'react';
import Link from 'next/link';

import getAllRecipes from '@/lib/getAllRecipes';

export default async function Recipes() {
  const recipesData: Promise<Recipe[] | undefined> = getAllRecipes();

  const recipes = await recipesData;

  return (
    <div>
      <h1>Page</h1>
      <Link href={'/'}>Link to Homepage!!!!</Link>
      {recipes?.map((recipe) => {
        return (
          <div
            key={recipe.id}
            className='flex justify-center flex-col items-center'
          >
            <h1>{recipe.name}</h1>
            <Link href={`/recipes/${recipe.id}`}>
              Click here to go to recipe page
            </Link>
          </div>
        );
      })}
    </div>
  );
}
