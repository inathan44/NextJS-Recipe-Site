import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export type RecipeCardProps = {
  recipe: Recipe;
};

export default function RecipeCard(props: RecipeCardProps) {
  const { recipe } = props;
  return (
    <Link href={`recipes/${recipe.id}`}>
      <div className=' w-96 border-2'>
        <h1 className='text-center text-2xl'>{recipe.name}</h1>
        {recipe.images && recipe.images.length > 0 && (
          <Image
            src={recipe.images[0]}
            alt={`Photo of ${recipe.name}`}
            width={384}
            height={100}
          />
        )}
        <p className='text-sm text-gray-500'>{recipe.tags.join(', ')}</p>
        <p>{recipe.description}</p>
      </div>
    </Link>
  );
}
