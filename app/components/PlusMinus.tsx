type PMProps = {
  servings: number | undefined;
  setNumOfServings: React.Dispatch<React.SetStateAction<number | undefined>>;
};

import { useState, useEffect } from 'react';

export default function PlusMinus({
  servings: numOfServings,
  setNumOfServings,
}: PMProps) {
  return (
    <div className='mx-auto flex max-w-[75px] items-center justify-between font-semibold text-lighter-dark'>
      <button
        disabled={typeof numOfServings !== 'number' || numOfServings <= 1}
        className='rounded-full bg-primary-dark disabled:bg-slate-500'
        onClick={() =>
          setNumOfServings((prev) => {
            if (typeof prev === 'number') return prev - 1;
            return prev;
          })
        }
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-5 w-5 stroke-primary-light'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M18 12H6' />
        </svg>
      </button>
      <p className='dark:text-primary-light'>{numOfServings || 'N/A'}</p>
      <button
        className='rounded-full bg-primary-dark'
        onClick={() =>
          setNumOfServings((prev) => {
            if (typeof prev === 'number') return prev + 1;
            return prev;
          })
        }
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-5 w-5 stroke-primary-light'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 6v12m6-6H6'
          />
        </svg>
      </button>
    </div>
  );
}
