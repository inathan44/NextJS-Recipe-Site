import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export type RecipeCardProps = {
  recipe: Recipe;
};

export default function RecipeCard(props: RecipeCardProps) {
  const { recipe } = props;
  return (
    <div className='max-w-96 flex h-[500px] w-full flex-col p-3 transition-all hover:bg-yellow-500'>
      {recipe.images && recipe.images.length > 0 && (
        <Image
          src={recipe.images[0]}
          alt={`Photo of ${recipe.name}`}
          width={100}
          height={100}
          className='w-full'
        />
      )}
      <p className='text-xs italic text-gray-500'>{recipe.tags.join(', ')}</p>
      <div className='flex w-full grow flex-col gap-6'>
        <h2 className=' text-2xl font-bold'>{recipe.name}</h2>
        <div className='grow'>
          <p className='text-lg'>{recipe.description}</p>
        </div>
        <Link href={`recipes/${recipe.id}`}>
          <p className='bg-primary-dark px-4 py-2 text-center text-primary-light hover:bg-darker-dark'>
            View Recipe &rarr;
          </p>
        </Link>
      </div>
    </div>
  );
}
