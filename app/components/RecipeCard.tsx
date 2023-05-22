import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export type RecipeCardProps = {
  recipe: Recipe;
};

export default function RecipeCard(props: RecipeCardProps) {
  const { recipe } = props;
  return (
    <div className='flex h-[500px] flex-col p-2 transition-all hover:bg-gray-100'>
      {recipe.images && recipe.images.length > 0 && (
        <Image
          src={recipe.images[0]}
          alt={`Photo of ${recipe.name}`}
          width={384}
          height={100}
        />
      )}
      <div className='flex w-96 grow flex-col gap-6'>
        {/* <p className='text-sm text-gray-500'>{recipe.tags.join(', ')}</p> */}
        <h2 className='text-center text-2xl font-bold'>{recipe.name}</h2>
        <div className='grow'>
          <p className='text-lg'>{recipe.description}</p>
        </div>
        <Link href={`recipes/${recipe.id}`}>
          <p className='inline rounded-full bg-primary-dark px-4 py-2 text-primary-light hover:bg-darker-dark'>
            View Recipe -{`>`}
          </p>
        </Link>
      </div>
    </div>
  );
}
