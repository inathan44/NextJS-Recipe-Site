'use client';

import React, { useState, useEffect } from 'react';
import {
  createRecipeDoc,
  uploadImages,
  deleteRecipe,
  editImages,
  handleDirectionsChange,
  updateRecipe,
  addDirection,
  handleIngredientsChange,
  addIngredient,
  handleMeasurementsChange,
  handleAmountsChange,
} from '@/app/utils/documentFunctions';

export default function AddRecipe() {
  const [name, setName] = useState<string>('');
  const [directions, setDirections] = useState<string[]>(['']);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [image, setImage] = useState<null | File>(null);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [addDocLoading, setAddDocLoading] = useState<boolean>(false);
  const [addDocError, setAddDocError] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [measurements, setMeasurements] = useState<string[]>([]);
  const [amounts, setAmounts] = useState<number[]>([]);

  useEffect(() => {
    image && uploadImages(image, setImageUrl, setUploadLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  return (
    <div className='flex h-screen items-center justify-center'>
      <div>
        {addDocError && <h2>{addDocError}</h2>}
        {addDocLoading && <h1 className='text-5xl'>LOADING...</h1>}
        <h1>Add a new recipe</h1>
        <form className='text-red-600'>
          <label htmlFor='name'>Name</label>
          <input
            className='block'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor='images'>Upload pics</label>
          <input
            className='block'
            type='file'
            name='images'
            id='images'
            multiple
            onChange={(e) =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
          />
          {/* Ingredients Section */}
          <div className='mt-6'>
            <div className='mt-1 flex items-center gap-5'>
              <h1 className='block text-lg font-semibold'>Ingredients</h1>
              <button
                className=''
                type='button'
                onClick={() => addIngredient(setIngredients)}
              >
                Add
              </button>
            </div>
            {ingredients.map((ingredient, idx) => (
              <div className='flex gap-3' key={idx}>
                <input
                  type='text'
                  value={ingredient}
                  onChange={(e) =>
                    handleIngredientsChange(e, idx, ingredients, setIngredients)
                  }
                  placeholder={`${idx + 1}.) ingredient`}
                  className='h-10 w-full rounded border px-3 text-xl'
                />
                <input
                  type='text'
                  value={measurements[idx]}
                  onChange={(e) =>
                    handleMeasurementsChange(
                      e,
                      idx,
                      measurements,
                      setMeasurements
                    )
                  }
                  placeholder={`${idx + 1}.) Unit`}
                  className='h-10 w-full rounded border px-3 text-xl'
                />
                <input
                  type='number'
                  value={amounts[idx]}
                  onChange={(e) =>
                    handleAmountsChange(e, idx, amounts, setAmounts)
                  }
                  placeholder={`${idx + 1}.) Amount`}
                  className='h-10 w-full rounded border px-3 text-xl'
                />
              </div>
            ))}
          </div>
          <label className='block' htmlFor='description'>
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {directions.map((direction, idx) => (
            <div key={idx}>
              <h1>Directions</h1>
              <input
                type='text'
                value={direction}
                onChange={(e) =>
                  handleDirectionsChange(e, idx, directions, setDirections)
                }
                placeholder={`${idx}.) Direction`}
              />
            </div>
          ))}
          <label className='block' htmlFor='tags'>
            Tags (separated by comma)
          </label>
          <input
            type='text'
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </form>
        <button
          onClick={() => addDirection(setDirections)}
          className='border-2 border-green-500 p-10'
        >
          Add Direction
        </button>
        <button
          type='button'
          className='block border-2 p-10 disabled:border-blue-600'
          disabled={uploadLoading}
          onClick={() =>
            createRecipeDoc(
              imageUrl,
              ingredients,
              directions,
              name,
              setName,
              setDirections,
              setIngredients,
              setImageUrl,
              setAddDocLoading,
              setAddDocError,
              description,
              tags,
              setTags,
              setDescription,
              amounts,
              setAmounts,
              measurements,
              setMeasurements
            )
          }
        >
          UPLOAD RECIPE
        </button>
      </div>
    </div>
  );
}
