'use client';

import { useState } from 'react';

import RecipeSection from './RecipeSection';
import PrepInfo from './PrepInfo';
import React from 'react';
import CommentSection from '../recipes/[recipeId]/components/CommentSection';
import CommentInput from '../recipes/[recipeId]/components/CommentInput';

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
      <RecipeSection name='Ingredients' color='#43484C'>
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
      <RecipeSection name='Directions' bgColor='#43484C' color='#303436'>
        <ol className='flex flex-col gap-2 overflow-hidden'>
          {recipe?.directions?.map((item, idx) => (
            <React.Fragment key={idx}>
              <div className='flex items-center gap-4'>
                <input type='checkbox' />
                <li>{item}</li>
              </div>
            </React.Fragment>
          ))}
        </ol>
      </RecipeSection>
      <RecipeSection name='Comments' bgColor='#303436' color='#262B2C'>
        <div className='overflow-hidden'>
          <CommentInput />
          <CommentSection />
        </div>
      </RecipeSection>
    </>
  );
}
