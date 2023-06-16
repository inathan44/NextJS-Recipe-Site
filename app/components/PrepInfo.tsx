import React from 'react';
import PlusMinus from './PlusMinus';

type PrepInfoProps = {
  cookTime: number | undefined;
  prepTime: number | undefined;
  servings: number | undefined;
  setNumOfServings: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export default function PrepInfo({
  cookTime,
  prepTime,
  servings,
  setNumOfServings,
}: PrepInfoProps) {
  return (
    <div className='border- flex grow justify-between rounded-t-3xl border-t border-gray-400 px-6 py-4 text-center text-lg font-semibold dark:text-lighter-light'>
      <div className='w-full'>
        <p>Servings</p>
        <PlusMinus servings={servings} setNumOfServings={setNumOfServings} />
      </div>
      <div className='w-full'>
        <p>Cook</p>
        <p className='text-base font-semibold text-lighter-dark dark:text-primary-light'>
          {cookTime || 'N/A'}
        </p>
      </div>
      <div className='w-full'>
        <p>Preparation</p>
        <p className='text-base font-semibold text-lighter-dark dark:text-primary-light'>
          {prepTime || 'N/A'}
        </p>
      </div>
    </div>
  );
}
