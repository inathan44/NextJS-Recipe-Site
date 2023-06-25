import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { startCase } from 'lodash';
import defaultImage from '../../../public/CleanPl8.png';

export type RecipeCardProps = {
  recipe: RecipeSnippet;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    // <div className='h-full overflow-hidden'>
    //   <div className='flex h-full w-full max-w-sm flex-col overflow-hidden rounded-xl shadow-xl transition-all'>
    <Link
      href={`recipes/${recipe.recipeId}`}
      className='flex h-full max-h-60 w-full max-w-sm flex-col overflow-hidden rounded-xl shadow-xl transition-all sm:max-h-72'
    >
      <div className='relative h-full overflow-hidden'>
        {recipe.recipeImage ? (
          <Image
            src={recipe.recipeImage}
            alt={`Photo of ${recipe.recipeName}`}
            className='h-full object-cover'
            width={1920}
            height={1080}
          />
        ) : (
          <Image
            src={defaultImage}
            alt={`default Image`}
            className='h-full object-cover'
          />
        )}
        <div className='absolute inset-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent' />
        <div className='absolute bottom-0 px-4 pb-2 text-white'>
          <h2 className='text-2xl font-semibold'>
            {startCase(recipe.recipeName)}
          </h2>
          <p className='h-6 overflow-hidden'>{recipe.recipeDescription}</p>
          <div className='flex gap-1'>
            {recipe.recipeTags?.map((tag, idx) => (
              <p
                className='rounded-full bg-gray-500/50 px-2 text-xs italic text-white'
                key={idx}
              >
                {tag}
              </p>
            ))}
          </div>
        </div>
      </div>
      {/* <div className='flex w-full grow flex-col gap-6'>
          <p className='bg-primary-dark px-4 py-2 text-center text-primary-light hover:bg-darker-dark'>
            View Recipe &rarr;
          </p>
        </div> */}
    </Link>
    //   </div>
    // </div>
  );
}
