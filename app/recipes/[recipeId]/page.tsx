import LeftArrowIcon from '@/app/components/LeftArrowIcon';
import PrepInfo from '@/app/components/PrepInfo';
import RecipeInfo from '@/app/components/RecipeInfo';
import RecipeSection from '@/app/components/RecipeSection';
import getAllRecipes from '@/lib/getAllRecipes';
import getRecipe from '@/lib/getRecipe';
import Image from 'next/image';
import Link from 'next/link';
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
            <p className='font-semibold'>Recipe</p>
            <Link href={`recipes/${recipe?.id}/edit`}>Edit</Link>
          </div>
          <h1 className='mb-3 text-3xl'>{recipe?.name}</h1>
          <div className=''>
            {recipe && (
              <Image
                src={recipe.image}
                width={500}
                height={1000}
                alt='Recipe photos'
                className='rounded-2xl'
              />
            )}
          </div>

          <p className='my-4 text-sm text-slate-800'>{recipe?.description}</p>
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
