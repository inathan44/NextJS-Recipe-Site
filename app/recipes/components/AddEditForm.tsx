'use client';

import { useEffect, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { recipeSchema } from '@/app/models/schema';
import type { RecipeSchema } from '@/app/models/schema';
import {
  deleteRecipe,
  editImages,
  updateRecipe,
  createRecipeDoc,
} from '@/app/utils/documentFunctions';
import getRecipe from '@/lib/getRecipe';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import PlusIcon from '@/app/components/PlusIcon';
import XIcon from '@/app/components/XIcon';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebaseConfig';
import { customizers, units } from '@/lib/unitsOfMeasurement';
import { startCase } from 'lodash';

type Params = {
  recipeId?: string;

  type: 'add' | 'edit';
};

export default function AddEditForm({ recipeId, type }: Params) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [image, setImage] = useState<null | File>(null);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [addDocLoading, setAddDocLoading] = useState<boolean>(false);
  const [addDocError, setAddDocError] = useState<string>('');
  const [deleteBuffer, setDeleteBuffer] = useState<boolean>(true);

  const [user] = useAuthState(auth);

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

  const {
    fields: directionsFields,
    append: directionsAppend,
    remove: directionsRemove,
  } = useFieldArray({
    control,
    name: 'directions',
  });

  useEffect(() => {
    if (ingredientFields.length === 0)
      ingredientAppend({
        name: '',
        amount: '' as unknown as number,
        measurement: '',
        custom: '',
      });
    if (directionsFields.length === 0) directionsAppend({ direction: '' });
  }, [
    directionsAppend,
    ingredientAppend,
    ingredientFields.length,
    directionsFields.length,
  ]);

  useEffect(() => {
    const test = async () => {
      if (recipeId) {
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
      }
    };
    if (type === 'edit') {
      test();
    }
  }, [recipeId, setValue, type]);

  useEffect(() => {
    image &&
      toast.promise(editImages(image, setImageUrl, setUploadLoading), {
        loading: 'Image uploading',
        success: 'Image uploaded',
        error: 'Error uploading image :(',
      });
    console.log('imageUrl', imageUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  const onSubmit: SubmitHandler<RecipeSchema> = (data) => {
    if (!user?.email) return toast.error('Must be signed in to add recipe');

    if (recipeId && type === 'edit') {
      toast.promise(
        updateRecipe(
          imageUrl,
          setAddDocLoading,
          setAddDocError,
          data,
          recipeId,
          user.uid
        ),
        {
          loading: 'Updating Recipe',
          success: 'Recipe Updated',
          error: (err) => err.toString(),
        }
      );
    }
    if (type === 'add') {
      toast.promise(
        createRecipeDoc(
          imageUrl,
          setImageUrl,
          setAddDocLoading,
          setAddDocError,
          data,
          reset,
          user?.uid!,
          user
        ),

        {
          loading: 'Adding Recipe...',
          success: 'Recipe added',
          error: (err) => `This just happened: ${err.toString()}`,
        }
      );
    }
    window.scrollTo({ top: 0 });
  };

  const handleDelete = () => {
    if (!deleteBuffer && recipeId) {
      toast.promise(deleteRecipe(recipeId, router), {
        loading: 'Deleting Recipe',
        success: 'Recipe Deleted',
        error: 'Error deleting :(',
      });
    } else {
      setDeleteBuffer(false);
    }
  };

  return (
    <>
      <div className=' px-4'>
        <div className='flex justify-center pt-5'>
          {imageUrl && (
            <button
              onClick={() => setImageUrl('')}
              className='mx-auto hover:bg-red-300'
            >
              <div className='max-w-sm'>
                <Image
                  src={imageUrl}
                  alt='Recipe Photo'
                  height={1920}
                  width={1080}
                  priority={true}
                  className='overflow-hidden rounded-xl hover:opacity-30'
                />
              </div>
            </button>
          )}
        </div>

        <div className='mx-auto mt-8 max-w-xl'>
          <form onSubmit={handleSubmit(onSubmit)} className='text-primary-dark'>
            <label
              className='mt-4 block text-lg font-semibold dark:text-primary-light '
              htmlFor='name'
            >
              Recipe Name <span className='text-red-500'>*</span>
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
                <h1 className='block text-lg font-semibold dark:text-primary-light'>
                  Ingredients <span className='text-red-500'>*</span>
                </h1>
                <button
                  className='dark flex w-16 items-center justify-between rounded-full px-2 dark:bg-primary-light dark:text-primary-dark'
                  type='button'
                  onClick={() =>
                    ingredientAppend({
                      name: '',
                      amount: '' as unknown as number,
                      measurement: '',
                      custom: '',
                    })
                  }
                >
                  <p>Add</p>
                  <PlusIcon />
                </button>
              </div>

              <div className='flex flex-col gap-8'>
                {ingredientFields.map((field, idx) => (
                  <div className='flex flex-col gap-1' key={field.id}>
                    <div className='flex items-center gap-2'>
                      <label className='w-16 shrink-0 dark:text-primary-light'>
                        Amount
                      </label>
                      <input
                        placeholder={`2`}
                        className='h-10  grow rounded bg-slate-100 px-3 placeholder:text-base'
                        {...register(`ingredients.${idx}.amount`)}
                      />
                    </div>
                    <div className='flex items-center gap-2'>
                      <label className='w-16 shrink-0 dark:text-primary-light'>
                        Unit
                      </label>
                      <select
                        className='h-10 grow rounded bg-slate-100 px-3'
                        {...register(`ingredients.${idx}.measurement`)}
                        onChange={(e) =>
                          setValue(
                            `ingredients.${idx}.measurement`,
                            e.target.value
                          )
                        }
                      >
                        <option value=''>Select Measurement</option>
                        <option value='N/A'>Not Applicable</option>
                        {units.map((unit) => (
                          <option value={unit} key={unit}>
                            {startCase(unit)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='flex items-center gap-2'>
                      <label className='w-16 shrink-0 dark:text-primary-light'>
                        Name
                      </label>
                      <input
                        placeholder={`Olive oil`}
                        className='h-10 grow rounded bg-slate-100 px-3 placeholder:text-base'
                        {...register(`ingredients.${idx}.name`)}
                      />
                    </div>
                    <div className='flex items-center gap-2'>
                      <label className='w-16 shrink-0 dark:text-primary-light'>
                        Custom
                      </label>
                      <select
                        className='h-10 grow rounded bg-slate-100 px-3'
                        {...register(`ingredients.${idx}.custom`)}
                        onChange={(e) =>
                          setValue(`ingredients.${idx}.custom`, e.target.value)
                        }
                      >
                        <option value=''>N/A</option>
                        {customizers.map((custom) => (
                          <option value={custom} key={custom}>
                            {startCase(custom)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type='button'
                      onClick={() => ingredientRemove(idx)}
                      className='flex w-full justify-center gap-2 rounded bg-red-500 font-semibold text-white'
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>

              {/* Direction section */}
              <div className='mt-6'>
                <div className='mt-1 flex items-center gap-5'>
                  <h1 className='block text-lg font-semibold dark:text-primary-light'>
                    Directions <span className='text-red-500'>*</span>
                  </h1>
                  <button
                    className='dark flex w-16 items-center justify-between rounded-full px-2 dark:bg-primary-light dark:text-primary-dark'
                    type='button'
                    onClick={() => directionsAppend({ direction: '' })}
                  >
                    <p>Add</p>
                    <PlusIcon />
                  </button>
                </div>
                <div className='flex flex-col gap-2'>
                  {directionsFields.map((field, idx) => (
                    <div className='flex gap-3' key={field.id}>
                      <input
                        placeholder={`${idx + 1}.) Direction`}
                        className='h-10 w-full rounded bg-slate-100 px-3 text-xl placeholder:text-base'
                        {...register(`directions.${idx}.direction`)}
                      />
                      <button
                        type='button'
                        onClick={() => directionsRemove(idx)}
                        className='rounded bg-red-500 px-2'
                      >
                        <XIcon />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <label
              className='mt-4 block text-lg font-semibold dark:text-primary-light'
              htmlFor='tags'
            >
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
            <label
              className='block text-lg font-semibold dark:text-primary-light'
              htmlFor='servings'
            >
              Servings
              <span className='text-sm font-light text-red-400'>
                {errors.servings?.message}
              </span>
            </label>
            <input
              className='block h-10 w-full rounded bg-slate-100 px-3 text-xl'
              type='text'
              {...register('servings')}
            />

            <label
              className='mt-4 block text-lg font-semibold dark:text-primary-light'
              htmlFor='prep'
            >
              Prep Time (minutes)
              <span className='text-sm font-light text-red-400'>
                {errors.prepTime?.message}
              </span>
            </label>
            <input
              className='block h-10 w-full rounded bg-slate-100 px-3 text-xl'
              type='text'
              {...register('prepTime')}
            />

            <label
              className='mt-4 block text-lg font-semibold dark:text-primary-light'
              htmlFor='cook'
            >
              Cook Time (minutes)
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
              className='mt-4 block text-lg font-semibold dark:text-primary-light'
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

            <label
              className='mt-4 block text-lg font-semibold dark:text-primary-light'
              htmlFor='images'
            >
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

            {type === 'edit' ? (
              <>
                <button
                  type='submit'
                  className='mt-4 block w-full rounded bg-primary-dark px-4 py-2 text-lighter-light disabled:bg-gray-200 disabled:text-gray-400 dark:bg-primary-light dark:text-primary-dark'
                  disabled={uploadLoading || addDocLoading}
                >
                  Update Recipe
                </button>
                <div
                  className={`mt-4 flex flex-row-reverse ${
                    deleteBuffer ? 'gap-0' : 'gap-2'
                  }`}
                >
                  <button
                    type='button'
                    className='block w-full rounded bg-red-500 px-4 py-2 text-lighter-light disabled:bg-gray-200 disabled:text-gray-400'
                    disabled={uploadLoading || addDocLoading}
                    onClick={handleDelete}
                  >
                    {!deleteBuffer ? 'Are you sure?' : 'Delete Recipe'}
                  </button>
                  {!deleteBuffer && (
                    <button
                      type='button'
                      className={` block w-full rounded px-4 py-2 text-lighter-light disabled:bg-gray-200 disabled:text-gray-400 dark:bg-darker-light dark:text-darker-dark`}
                      disabled={uploadLoading || addDocLoading}
                      onClick={() => setDeleteBuffer(true)}
                    >
                      Cancel Delete
                    </button>
                  )}
                </div>
              </>
            ) : (
              <>
                {' '}
                <button
                  type='submit'
                  className='my-6 block w-full rounded bg-primary-dark px-4 py-2 text-lighter-light dark:bg-primary-light dark:text-primary-dark'
                  disabled={uploadLoading}
                >
                  Create
                </button>
              </>
            )}
          </form>
        </div>
        <Toaster />
      </div>
    </>
  );
}
