'use client';

import { useState } from 'react';

export default function PlusMinus() {
  const [numOfServings, setNumOfServings] = useState<number>(1);

  return (
    <div className='mx-auto flex max-w-[75px] items-center justify-between font-semibold text-lighter-dark'>
      <button
        disabled={numOfServings <= 0}
        className='rounded-full bg-primary-dark'
        onClick={() => setNumOfServings((prev) => prev - 1)}
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
      <p>{numOfServings}</p>
      <button
        className='rounded-full bg-primary-dark'
        onClick={() => setNumOfServings((prev) => prev + 1)}
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
