import React from 'react';
import Link from 'next/link';

import getAllRecipes from '@/lib/getAllRecipes';
import FilterSortBar from '../components/FilterSortBar';
import { Suspense } from 'react';
import AllRecipes from '../components/AllRecipes';
import searchFilterRecipes from '@/lib/searchFilterRecipes';

export default async function Recipes({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const searchQuery = searchParams.search ?? '';

  const recipesData: Promise<Recipe[]> = searchFilterRecipes(searchQuery);

  // // const recipes = await recipesData;

  return (
    <>
      <FilterSortBar />
      <div className='mx-auto my-4 grid max-w-7xl grid-cols-1 place-items-center justify-center gap-x-4 gap-y-8 px-4 md:grid-cols-2 lg:grid-cols-3'>
        <Suspense fallback={<p className='p-24'>LOADING...</p>}>
          {/* @ts-expect-error-Server Component */}
          <AllRecipes promise={recipesData} />
        </Suspense>
      </div>
    </>
  );
}
