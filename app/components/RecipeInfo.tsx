'use client';

import { useState } from 'react';

import RecipeSection from './RecipeSection';
import PrepInfo from './PrepInfo';

type InfoProps = {
  recipe: Recipe;
};

export default function RecipeInfo({ recipe }: InfoProps) {
  const [numOfServings, setNumOfServings] = useState<number | undefined>(
    recipe.servings
  );

  return (
    <>
      <PrepInfo
        cookTime={recipe?.cookTime}
        prepTime={recipe?.prepTime}
        setNumOfServings={setNumOfServings}
        servings={numOfServings}
      />
      <RecipeSection name='Ingredients' color='#43484C'>
        <ol className='flex list-disc flex-col gap-2 overflow-hidden pl-4'>
          {recipe?.ingredients?.map((item, idx) => (
            <li key={idx}>
              {item.name}:{' '}
              {recipe.servings && numOfServings
                ? (numOfServings / recipe.servings) * item.amount
                : item.amount}{' '}
              {item.measurement}(s)
            </li>
          ))}
        </ol>
      </RecipeSection>
      <RecipeSection name='Directions' bgColor='#43484C' color='#303436'>
        <ol className='flex list-decimal flex-col gap-2 overflow-hidden pl-4'>
          {recipe?.directions?.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ol>
      </RecipeSection>
    </>
  );
}
