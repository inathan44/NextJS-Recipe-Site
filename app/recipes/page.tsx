import React from 'react';
import Link from 'next/link';

import getAllRecipes from '@/lib/getAllRecipes';
import RecipeCard from './components/RecipeCard';
import FilterSortBar from './components/FilterSortBar';

export default async function Recipes({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const searchQuery = searchParams.search ?? '';

  const recipesData: Promise<Recipe[]> = getAllRecipes(searchQuery);

  const recipes = await recipesData;

  return (
    <>
      <FilterSortBar />
      <div className='my-4 grid max-w-7xl grid-cols-1 place-items-center justify-center gap-y-8 px-4 md:grid-cols-2 lg:grid-cols-3'>
        {recipes?.map((recipe) => {
          return <RecipeCard recipe={recipe} key={recipe.id} />;
        })}
        {recipes?.map((recipe) => {
          return <RecipeCard recipe={recipe} key={recipe.id} />;
        })}
        {recipes?.map((recipe) => {
          return <RecipeCard recipe={recipe} key={recipe.id} />;
        })}
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
