import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { startCase } from 'lodash';

export type RecipeCardProps = {
  recipe: Recipe;
};

export default function RecipeCard(props: RecipeCardProps) {
  const { recipe } = props;
  return (
    <div className='max-h-72 w-full overflow-hidden'>
      <div className='flex w-full max-w-sm flex-col overflow-hidden rounded-xl shadow-xl transition-all'>
        <Link href={`recipes/${recipe.id}`}>
          <div className='relative max-h-72 min-w-full overflow-hidden'>
            {recipe.image ? (
              <Image
                src={recipe.image}
                alt={`Photo of ${recipe.name}`}
                className='max-h-full w-full max-w-full'
                // fill
                width={1920}
                height={1080}
                style={{ objectFit: 'contain' }}
              />
            ) : (
              <div className='h-72 max-h-72 w-full'></div>
            )}
            <div className='absolute inset-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent' />
            <div className='absolute bottom-0 px-4 pb-2 text-white'>
              <h2 className='text-2xl font-semibold'>
                {startCase(recipe.name)}
              </h2>
              <p className='h-6 overflow-hidden'>{recipe.description}</p>
              <div className='flex gap-1'>
                {recipe.tags.map((tag, idx) => (
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
      </div>
    </div>
  );
}
