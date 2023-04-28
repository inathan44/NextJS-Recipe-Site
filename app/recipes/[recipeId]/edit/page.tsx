'use client';
import { useEffect, useState } from 'react';
import {
  deleteRecipe,
  editImages,
  handleDirectionsChange,
  updateRecipe,
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
  const [ingredients, setIngredients] = useState<string>('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [images, setImages] = useState<null | FileList>(null);
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
      setIngredients(recipeData?.ingredients?.join(', ') || '');
      setTags(recipeData?.tags?.join(', ') || '');
      setDescription(recipeData?.description || '');
      setImageUrls(recipeData?.images || []);
    };
    test();
  }, [recipeId]);

  useEffect(() => {
    images && editImages(images, setImageUrls, setUploadLoading, imageUrls);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  return (
    <>
      <div className='flex w-screen justify-center'>
        <div className='mx-auto mt-24 flex justify-center'>
          <form className='mx-auto text-red-600 '>
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
            <button
              className='mb-8 block w-full border-2 py-2'
              type='button'
              onClick={() =>
                updateRecipe(
                  recipeId,
                  name,
                  ingredients,
                  directions,
                  imageUrls,
                  tags,
                  description
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
      {imageUrls.map((image, idx) => (
        <button
          onClick={() =>
            setImageUrls((prev) => {
              let data = [...prev];
              data.splice(idx, 1);
              return data;
            })
          }
          key={idx}
          className='hover:bg-red-300'
        >
          <Image
            src={image}
            alt='Recipe Photo'
            height={300}
            width={300}
            priority={true}
            key={idx}
            className='hover:opacity-30'
          />
        </button>
      ))}
    </>
  );
}
