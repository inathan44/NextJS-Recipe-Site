'use client';
import { useEffect, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { recipeSchema } from '@/app/models/schema';
import type { RecipeSchema } from '@/app/models/schema';
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
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [measurements, setMeasurements] = useState<string[]>([]);
  const [amounts, setAmounts] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [image, setImage] = useState<null | File>(null);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [addDocLoading, setAddDocLoading] = useState<boolean>(false);
  const [addDocError, setAddDocError] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [cookTime, setCookTime] = useState<string>('');
  const [prepTime, setPrepTime] = useState<string>('');
  const [servings, setServings] = useState<string>('');

  const {
    register,
    handleSubmit,
    trigger,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm<RecipeSchema>({ resolver: zodResolver(recipeSchema) });

  const router = useRouter();

  const {
    fields: ingredientFields,
    append: ingredientAppend,
    prepend: ingredientPrepend,
    remove: ingredientRemove,
    swap: ingredientSwap,
    move: ingredientMove,
  } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const { fields: directionsFields, append: directionsAppend } = useFieldArray({
    control,
    name: 'directions',
  });

  useEffect(() => {
    const test = async () => {
      const recipeData = await getRecipe(recipeId);

      setValue('name', recipeData?.name || '');
      setValue('description', recipeData?.description || '');
      setValue(
        'servings',
        (recipeData?.servings?.toString() || '1') as unknown as number
      );
      setValue(
        'prepTime',
        (recipeData?.prepTime?.toString() || '1') as unknown as number
      );
      setValue(
        'cookTime',
        (recipeData?.cookTime?.toString() || '1') as unknown as number
      );

      setValue(
        'ingredients',
        // @ts-ignore
        recipeData?.ingredients.map((i) => {
          return {
            name: i.name,
            measurement: i.measurement,
            amount: i.amount.toString(),
          };
        }) || []
      );

      setValue(
        'tags',
        (recipeData?.tags.join(', ') || '') as unknown as string[]
      );
      setValue(
        'directions',
        recipeData?.directions.map((item) => {
          return { direction: item };
        }) || []
      );
      setImageUrl(recipeData?.image || '');
    };
    test();
  }, [recipeId, setValue]);

  useEffect(() => {
    image && editImages(image, setImageUrl, setUploadLoading, imageUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  const onSubmit: SubmitHandler<RecipeSchema> = (data) => {
    console.log('data', data);
  };

  return (
    <div className='mx-4'>
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
        <form onSubmit={handleSubmit(onSubmit)} className='text-primary-dark'>
          <label className='mt-4 block text-lg font-semibold' htmlFor='name'>
            Name{' '}
            <span className='text-sm font-light text-red-400'>
              {errors.name?.message}
            </span>
          </label>
          <input
            {...register('name')}
            className='block h-10 w-full rounded border px-3 text-xl'
            type='text'
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
                onClick={() =>
                  ingredientAppend({ name: '', measurement: '', amount: 0 })
                }
              >
                Add
              </button>
            </div>
            {ingredientFields.map((field, idx) => (
              <div className='flex gap-3' key={field.id}>
                <input
                  placeholder={`ingredient`}
                  className='h-10 w-full rounded border px-3 text-xl'
                  {...register(`ingredients.${idx}.name`)}
                />
                <input
                  placeholder={`measurement`}
                  className='h-10 w-full rounded border px-3 text-xl'
                  {...register(`ingredients.${idx}.measurement`)}
                />
                <input
                  placeholder={`amount`}
                  className='h-10 w-full rounded border px-3 text-xl'
                  {...register(`ingredients.${idx}.amount`)}
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
                  onClick={() => directionsAppend({ direction: '' })}
                >
                  Add
                </button>
              </div>
              {directionsFields.map((field, idx) => (
                <div className='flex gap-3' key={field.id}>
                  <input
                    placeholder={`${idx + 1}.) Direction`}
                    className='h-10 w-full rounded border px-3 text-xl'
                    {...register(`directions.${idx}.direction`)}
                  />
                </div>
              ))}
            </div>
          </div>
          <label className='mt-4 block text-lg font-semibold' htmlFor='tags'>
            Tags (separated by comma){' '}
            <span className='text-sm font-light text-red-400'>
              {errors.name?.message}
            </span>
          </label>
          <input
            type='text'
            className='block h-10 w-full rounded border px-3 text-xl'
            {...register('tags')}
          />
          {errors.servings?.message && <p>{errors.servings.message}</p>}
          <label className='block text-lg font-semibold' htmlFor='servings'>
            Servings{' '}
            <span className='text-sm font-light text-red-400'>
              {errors.servings?.message}
            </span>
          </label>
          <input
            className='block h-10 w-full rounded border px-3 text-xl'
            type='text'
            {...register('servings')}
          />

          <label className='mt-4 block text-lg font-semibold' htmlFor='prep'>
            Prep Time (minutes){' '}
            <span className='text-sm font-light text-red-400'>
              {errors.prepTime?.message}
            </span>
          </label>
          <input
            className='block h-10 w-full rounded border px-3 text-xl'
            type='text'
            {...register('prepTime')}
          />

          <label className='mt-4 block text-lg font-semibold' htmlFor='cook'>
            Cook Time (minutes){' '}
            <span className='text-sm font-light text-red-400'>
              {errors.cookTime?.message}
            </span>
          </label>
          <input
            className='block h-10 w-full rounded border px-3 text-xl'
            type='text'
            {...register('cookTime')}
          />

          <label
            className='mt-4 block text-lg font-semibold'
            htmlFor='description'
          >
            Description{' '}
            <span className='text-sm font-light text-red-400'>
              {errors.description?.message}
            </span>
          </label>
          <textarea
            {...register('description')}
            className='block h-36 w-full rounded border px-3 text-xl'
          />
          <button
            type='submit'
            className='mb-8 block w-full border-2 py-2 disabled:border-blue-500'
            disabled={uploadLoading}
          >
            Create
          </button>

          <button
            type='submit'
            className='bg-primary-dark px-4 py-2 text-lighter-light'
          >
            TEST ZOD
          </button>
        </form>
      </div>
    </div>
  );
}
