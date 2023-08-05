'use client';

import { useState } from 'react';

import RecipeSection from './RecipeSection';
import PrepInfo from './PrepInfo';
import React from 'react';
import CommentSection from '../recipes/[recipeId]/components/CommentSection';
import CommentInput from '../recipes/[recipeId]/components/CommentInput';
import Background from './Background';

type InfoProps = {
  recipe: Recipe;
};

export default function RecipeInfo({ recipe }: InfoProps) {
  const [numOfServings, setNumOfServings] = useState<number | undefined>(
    recipe.servings
  );

  return (
    <>
      <div className='md:hidden'>
        <PrepInfo
          cookTime={recipe?.cookTime}
          prepTime={recipe?.prepTime}
          setNumOfServings={setNumOfServings}
          servings={numOfServings}
        />
      </div>
      <Background className='bg-primary-light dark:bg-primary-dark'>
        <RecipeSection
          name='Ingredients'
          color='#43484C'
          className='justify-between overflow-hidden rounded-t-3xl bg-lighter-light px-6 py-4 text-primary-dark dark:bg-lighter-dark dark:text-lighter-light'
        >
          <ol className='flex flex-col gap-3 overflow-hidden'>
            {recipe?.ingredients?.map((item, idx) => (
              <React.Fragment key={idx}>
                <div className='flex items-center gap-4'>
                  <input type='checkbox' />
                  <li className=''>
                    {item.name}:{' '}
                    {recipe.servings && numOfServings
                      ? (numOfServings / recipe.servings) * item.amount
                      : item.amount}{' '}
                    {item.measurement}(s)
                  </li>
                </div>
              </React.Fragment>
            ))}
          </ol>
        </RecipeSection>
      </Background>
      <Background className='bg-lighter-light dark:bg-lighter-dark'>
        <RecipeSection
          name='Directions'
          color='#303436'
          className='justify-between overflow-hidden rounded-t-3xl bg-primary-light px-6 py-4 text-primary-dark dark:bg-primary-dark dark:text-lighter-light'
        >
          <ol className='flex flex-col gap-2 overflow-hidden'>
            {recipe?.directions?.map((item, idx) => (
              <React.Fragment key={idx}>
                <div className='flex items-center gap-4'>
                  <input type='checkbox' />
                  <li>
                    {idx + 1}
                    {`. `}
                    {item}
                  </li>
                </div>
              </React.Fragment>
            ))}
          </ol>
        </RecipeSection>
      </Background>
      <Background className='bg-primary-light dark:bg-primary-dark'>
        <RecipeSection
          name='Comments'
          color='#262B2C'
          className='justify-between overflow-hidden rounded-t-3xl bg-darker-light px-6 py-4 text-primary-dark dark:bg-darker-dark dark:text-lighter-light'
        >
          <div className='overflow-hidden'>
            <CommentInput />
            <CommentSection />
          </div>
        </RecipeSection>
      </Background>
    </>
  );
}
