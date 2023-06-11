'use client';
import { useEffect, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { recipeSchema } from '@/app/models/schema';
import type { RecipeSchema } from '@/app/models/schema';
import { editImages, updateRecipe } from '@/app/utils/documentFunctions';
import getRecipe from '@/lib/getRecipe';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

type Params = {
  params: {
    recipeId: string;
  };
};

export default function EditRecipe({ params: { recipeId } }: Params) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [image, setImage] = useState<null | File>(null);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [addDocLoading, setAddDocLoading] = useState<boolean>(false);
  const [addDocError, setAddDocError] = useState<string>('');

  const {
    register,
    handleSubmit,
    trigger,
    reset,
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
    image &&
      toast.promise(editImages(image, setImageUrl, setUploadLoading), {
        loading: 'Image uploading',
        success: 'Image uploaded',
        error: 'Error uploading image :(',
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  const onSubmit: SubmitHandler<RecipeSchema> = (data) => {
    console.log('data', data);

    toast.promise(
      updateRecipe(imageUrl, setAddDocLoading, setAddDocError, data, recipeId),
      {
        loading: 'Updating Recipe',
        success: 'Recipe Updated',
        error: 'Error updating recipe, try again later',
      }
    );
  };

  return (
    <div className='bg-white px-4'>
      <div className='flex justify-center pt-5'>
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
            Recipe Name{' '}
            <span className='text-sm font-light text-red-400'>
              {errors.name?.message}
            </span>
          </label>
          <input
            {...register('name')}
            className='block h-10 w-full rounded bg-slate-100 px-3 text-xl'
            type='text'
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
            <div className='flex flex-col gap-2'>
              {ingredientFields.map((field, idx) => (
                <div className='flex gap-3' key={field.id}>
                  <input
                    placeholder={`ingredient`}
                    className='h-10 w-full rounded bg-slate-100 px-3 text-xl'
                    {...register(`ingredients.${idx}.name`)}
                  />
                  <input
                    placeholder={`measurement`}
                    className='h-10 w-full rounded bg-slate-100 px-3 text-xl'
                    {...register(`ingredients.${idx}.measurement`)}
                  />
                  <input
                    placeholder={`amount`}
                    className='h-10 w-full rounded bg-slate-100 px-3 text-xl'
                    {...register(`ingredients.${idx}.amount`)}
                  />
                </div>
              ))}
            </div>

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
              <div className='flex flex-col gap-2'>
                {directionsFields.map((field, idx) => (
                  <div className='flex gap-3' key={field.id}>
                    <input
                      placeholder={`${idx + 1}.) Direction`}
                      className='h-10 w-full rounded bg-slate-100 px-3 text-xl'
                      {...register(`directions.${idx}.direction`)}
                    />
                  </div>
                ))}
              </div>
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
            className='block h-10 w-full rounded bg-slate-100 px-3 text-xl'
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
            className='block h-10 w-full rounded bg-slate-100 px-3 text-xl'
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
            className='block h-10 w-full rounded bg-slate-100 px-3 text-xl'
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
            className='block h-10 w-full rounded bg-slate-100 px-3 text-xl'
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
            className='block h-36 w-full rounded bg-slate-100 px-3 text-xl'
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

          <button
            type='submit'
            className='my-6 block w-full rounded bg-primary-dark px-4 py-2 text-lighter-light'
            disabled={uploadLoading}
          >
            Update Recipe
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

function notify() {
  toast('Here is your toast.');
}
