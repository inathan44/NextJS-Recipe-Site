'use client';

import React, { useState, useEffect } from 'react';
import {
  createRecipeDoc,
  uploadImages,
  handleDirectionsChange,
  addDirection,
} from '@/app/utils/documentFunctions';

export default function AddRecipe() {
  const [name, setName] = useState<string>('');
  const [directions, setDirections] = useState<string[]>(['']);
  const [ingredients, setIngredients] = useState<string>('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [images, setImages] = useState<null | FileList>(null);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [addDocLoading, setAddDocLoading] = useState<boolean>(false);
  const [addDocError, setAddDocError] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    images && uploadImages(images, setImageUrls, setUploadLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

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
            onChange={(e) => setImages(e.target.files)}
          />
          <label className='block' htmlFor='ingredients'>
            Ingredients (separated by comma)
          </label>
          <input
            type='text'
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
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
              imageUrls,
              ingredients,
              directions,
              name,
              setName,
              setDirections,
              setIngredients,
              setImageUrls,
              setAddDocLoading,
              setAddDocError,
              description,
              tags,
              setTags,
              setDescription
            )
          }
        >
          UPLOAD RECIPE
        </button>
      </div>
    </div>
  );
}