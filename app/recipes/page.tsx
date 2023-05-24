import React from 'react';
import Link from 'next/link';

import getAllRecipes from '@/lib/getAllRecipes';
import RecipeCard from './components/RecipeCard';
import FilterSortBar from './components/FilterSortBar';

export default async function Recipes() {
  const recipesData: Promise<Recipe[] | undefined> = getAllRecipes();

  const recipes = await recipesData;

  return (
    <>
      <FilterSortBar />
      <div className='mx-auto my-4 grid max-w-7xl grid-cols-1 justify-center gap-y-8 md:grid-cols-2 lg:grid-cols-3'>
        {recipes?.map((recipe) => {
          return <RecipeCard recipe={recipe} key={recipe.id} />;
        })}
        {recipes?.map((recipe) => {
          return <RecipeCard recipe={recipe} key={recipe.id} />;
        })}
      </div>
    </>
  );
}
