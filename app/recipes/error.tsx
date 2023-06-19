'use client';

import React from 'react';

const RecipesError = () => {
  return (
    <div className='min-h-[calc(100vh_-_204px)] md:min-h-[calc(100vh_-_172px)]'>
      <h1 className='text-center text-3xl dark:text-primary-light'>
        Error getting recipes, please try again later.
      </h1>
    </div>
  );
};

export default RecipesError;
