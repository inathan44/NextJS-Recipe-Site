'use client';
import { useEffect, useState } from 'react';
import {
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
import getRecipe from '@/lib/getRecipe';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Params = {
  params: {
    recipeId: string;
  };
};

export default function EditRecipe({ params: { recipeId } }: Params) {
  const [name, setName] = useState<string>('');
  const [directions, setDirections] = useState<string[]>(['']);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [measurements, setMeasurements] = useState<string[]>([]);
  const [amounts, setAmounts] = useState<number[]>([]);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [image, setImage] = useState<null | File>(null);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [addDocLoading, setAddDocLoading] = useState<boolean>(false);
  const [addDocError, setAddDocError] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    const test = async () => {
      const recipeData = await getRecipe(recipeId);
      setName(recipeData?.name || '');
      setDirections(recipeData?.directions || ['']);
      setIngredients(recipeData?.ingredients.map(({ name }) => name) || ['']);
      setMeasurements(
        recipeData?.ingredients.map(({ measurement }) => measurement) || ['']
      );
      setAmounts(recipeData?.ingredients.map(({ amount }) => amount) || [0]);
      // setIngredients(recipeData?.ingredients?.join(', ') || '');
      setTags(recipeData?.tags?.join(', ') || '');
      setDescription(recipeData?.description || '');
      setImageUrl(recipeData?.image || '');
    };
    test();
  }, [recipeId]);

  useEffect(() => {
    image && editImages(image, setImageUrl, setUploadLoading, imageUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  return (
    <div className='mx-4'>
      <h1 className='mb-3 text-3xl'>{name}</h1>
      <div className='flex justify-center'>
        {imageUrl && (
          <button
            onClick={() => setImageUrl('')}
            className='mx-auto hover:bg-red-300'
          >
            <Image
              src={imageUrl}
              alt='Recipe Photo'
              height={300}
              width={300}
              priority={true}
              className='overflow-hidden rounded-xl hover:opacity-30'
            />
          </button>
        )}
      </div>

      <div className='mx-auto mt-8 max-w-md'>
        <form className='text-primary-dark'>
          <label className='mt-4 block text-lg font-semibold' htmlFor='name'>
            Name
          </label>
          <input
            className='block h-10 w-full rounded border px-3 text-xl'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className='mt-4 block text-lg font-semibold' htmlFor='images'>
            Upload photo
          </label>
          <input
            className='w-full'
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

            {/* Direction section */}
            <div className='mt-6'>
              <div className='mt-1 flex items-center gap-5'>
                <h1 className='block text-lg font-semibold'>Directions</h1>
                <button
                  className=''
                  type='button'
                  onClick={() => addDirection(setDirections)}
                >
                  Add
                </button>
              </div>
              {directions.map((direction, idx) => (
                <div className='' key={idx}>
                  <input
                    type='text'
                    value={direction}
                    onChange={(e) =>
                      handleDirectionsChange(e, idx, directions, setDirections)
                    }
                    placeholder={`${idx + 1}.) Direction`}
                    className='block h-10 w-full rounded border px-3 text-xl'
                  />
                </div>
              ))}
            </div>
          </div>
          <label className='mt-4 block text-lg font-semibold' htmlFor='tags'>
            Tags (separated by comma)
          </label>
          <input
            type='text'
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className='block h-10 w-full rounded border px-3 text-xl'
          />
          <label
            className='mt-4 block text-lg font-semibold'
            htmlFor='description'
          >
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='block h-36 w-full rounded border px-3 text-xl'
          />
          <button
            className='mb-8 block w-full border-2 py-2'
            type='button'
            onClick={() =>
              updateRecipe(
                recipeId,
                name,
                ingredients,
                directions,
                imageUrl,
                tags,
                description,
                amounts,
                measurements
              )
            }
          >
            Update
          </button>
          <button
            className='block w-full border-2 border-red-600 py-2'
            type='button'
            onClick={() => deleteRecipe(recipeId, router)}
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}
