import LeftArrowIcon from '@/app/components/LeftArrowIcon';
import RecipeInfo from '@/app/components/RecipeInfo';
import getAllRecipes from '@/lib/getAllRecipes';
import getRecipe from '@/lib/getRecipe';
import Image from 'next/image';
import Link from 'next/link';
import { startCase } from 'lodash';
import PrinterIcon from '@/app/components/PrinterIcon';
import DesktopRecipeTag from '@/app/components/DesktopRecipeTag';
import PrepItem from '@/app/components/PrepItem';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebaseConfig';
import EditRecipeLink from '@/app/components/EditRecipeLink';
import LikeRecipe from './components/LikeRecipe';
// import LeftArrowIcon from '@/app/components/leftArrowIcon';

type Params = {
  params: {
    recipeId: string;
  };
};

export default async function SingleRecipe({ params: { recipeId } }: Params) {
  const recipeData: Promise<Recipe | undefined> = getRecipe(recipeId);

  const recipe = await recipeData;

  const recipeSnippet: RecipeSnippet = {
    recipeId: recipe?.id!,
    recipeName: recipe?.name!,
    recipeDescription: recipe?.description,
    recipeImage: recipe?.image,
    recipeTags: recipe?.tags,
  };

  return (
    <>
      <div className=''>
        <div className='mx-auto max-w-5xl'>
          <div className='mx-3 mb-5 flex items-center justify-between'>
            <div className='rounded-full bg-darker-light p-1'>
              <LeftArrowIcon />
            </div>

            <p className='font-semibold dark:text-primary-light md:hidden'>
              Recipe
            </p>

            <EditRecipeLink recipe={recipe} />
          </div>
        </div>

        <div className='mx-auto max-w-5xl'>
          <div className='mx-3'>
            <div className='mb-3 flex items-center gap-4'>
              <h1 className='text-3xl dark:text-primary-light md:hidden'>
                {startCase(recipe?.name)}
              </h1>
              <div className='md:hidden'>
                <LikeRecipe
                  likes={recipe?.likes || 0}
                  recipeInfo={recipeSnippet}
                />
              </div>
            </div>
            <div className='h-84 flex justify-center md:mb-4'>
              {recipe?.image && (
                <div className='relative mx-auto max-w-lg md:mx-0 md:w-full'>
                  <Image
                    src={recipe.image}
                    // fill
                    width={1920}
                    height={1080}
                    alt='Recipe photos'
                    className='max-h-96 w-full max-w-md rounded-2xl object-contain'
                  />
                </div>
              )}

              <div className='mx-6 hidden w-full flex-col gap-4 pl-8 md:flex'>
                <h1 className='text-5xl font-bold dark:text-primary-light'>
                  {startCase(recipe?.name)}
                </h1>

                {/* Tags and icon Chips */}
                <div className='flex items-center gap-3'>
                  {recipe?.tags?.map((tag, idx) => (
                    <DesktopRecipeTag tag={tag} key={idx} />
                  ))}
                  <PrinterIcon />
                  <LikeRecipe
                    recipeInfo={recipeSnippet}
                    likes={recipe?.likes || 0}
                  />
                </div>

                <div className='flex gap-4 text-sm'>
                  <PrepItem
                    text='Total'
                    number={(recipe?.cookTime || 0) + (recipe?.prepTime || 0)}
                  >
                    m
                  </PrepItem>
                  <PrepItem text='Cook' number={recipe?.cookTime || 'N/A'}>
                    m
                  </PrepItem>
                  <PrepItem text='Prep' number={recipe?.prepTime || 'N/A'}>
                    m
                  </PrepItem>
                  <PrepItem
                    text='Servings'
                    number={recipe?.servings || 'N/A'}
                  />
                </div>

                <p className='dark:text-primary-light'>{recipe?.description}</p>
              </div>
            </div>

            <p className='my-4 text-sm text-slate-800 dark:text-primary-light md:hidden'>
              {recipe?.description}
            </p>
          </div>
        </div>
      </div>
      {recipe && <RecipeInfo recipe={recipe} />}
    </>
  );
}

export async function generateStaticParams() {
  const recipesData: any = getAllRecipes();
  const recipes = await recipesData;

  if (recipes)
    return recipes.map((recipe: Recipe) => ({ recipeId: recipe.id }));
}
