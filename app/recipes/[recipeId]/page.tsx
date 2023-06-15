import LeftArrowIcon from '@/app/components/LeftArrowIcon';
import PrepInfo from '@/app/components/PrepInfo';
import RecipeInfo from '@/app/components/RecipeInfo';
import RecipeSection from '@/app/components/RecipeSection';
import getAllRecipes from '@/lib/getAllRecipes';
import getRecipe from '@/lib/getRecipe';
import Image from 'next/image';
import Link from 'next/link';
import { startCase } from 'lodash';
import PrinterIcon from '@/app/components/PrinterIcon';
import DesktopRecipeTag from '@/app/components/DesktopRecipeTag';
import PrepItem from '@/app/components/PrepItem';
// import LeftArrowIcon from '@/app/components/leftArrowIcon';

type Params = {
  params: {
    recipeId: string;
  };
};

export default async function SingleRecipe({ params: { recipeId } }: Params) {
  const recipeData: Promise<Recipe | undefined> = getRecipe(recipeId);

  const recipe = await recipeData;

  return (
    <>
      <div className=''>
        <div className='mx-3'>
          <div className='mb-5 flex items-center justify-between'>
            <div className='rounded-full bg-darker-light p-1'>
              <LeftArrowIcon />
            </div>
            <p className='font-semibold  md:hidden'>Recipe</p>
            <Link
              className='rounded-full px-3 py-1 transition-all hover:bg-primary-dark hover:text-primary-light'
              href={`recipes/${recipe?.id}/edit`}
            >
              Edit
            </Link>
          </div>
          <h1 className='mb-3 text-3xl md:hidden'>{startCase(recipe?.name)}</h1>
          <div className='h-84 flex md:mb-4'>
            <div className='relative mx-auto max-w-lg md:mx-0 md:w-2/5'>
              {recipe && (
                <Image
                  src={recipe.image}
                  // fill
                  width={1920}
                  height={1080}
                  alt='Recipe photos'
                  className='w-full max-w-md rounded-2xl object-contain'
                />
              )}
            </div>

            <div className='mx-6 hidden w-3/5 flex-col gap-4 pl-8 md:flex'>
              <h1 className='text-5xl font-bold'>{startCase(recipe?.name)}</h1>

              <div className='flex items-center gap-3'>
                {recipe?.tags?.map((tag, idx) => (
                  <DesktopRecipeTag tag={tag} key={idx} />
                ))}
                <PrinterIcon />
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
                <PrepItem text='Servings' number={recipe?.servings || 'N/A'} />
              </div>

              <p>{recipe?.description}</p>
            </div>
          </div>

          <p className='my-4 text-sm text-slate-800 md:hidden'>
            {recipe?.description}
          </p>
        </div>
      </div>
      {recipe && <RecipeInfo recipe={recipe} />}
    </>
  );
}

export async function generateStaticParams() {
  const recipesData: any = getAllRecipes('');
  const recipes = await recipesData;

  if (recipes)
    return recipes.map((recipe: Recipe) => ({ recipeId: recipe.id }));
}
