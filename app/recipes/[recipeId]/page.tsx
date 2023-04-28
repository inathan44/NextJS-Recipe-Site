import getAllRecipes from '@/lib/getAllRecipes';
import getRecipe from '@/lib/getRecipe';
import Image from 'next/image';

type Params = {
  params: {
    recipeId: string;
  };
};

export default async function SingleRecipe({ params: { recipeId } }: Params) {
  const recipeData: Promise<Recipe | undefined> = getRecipe(recipeId);

  const recipe = await recipeData;

  return (
    <div>
      <h1>hi</h1>
      <h1>{recipe?.name}</h1>
      <h2>{recipe?.description}</h2>
      {recipe?.images?.map((image: string, idx: number) => {
        return (
          <Image
            key={idx}
            src={image}
            width={500}
            height={1000}
            alt='Recipe photos'
          />
        );
      })}
      <ol>
        {recipe?.directions?.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ol>
    </div>
  );
}

export async function generateStaticParams() {
  const recipesData: any = getAllRecipes();
  const recipes = await recipesData;

  if (recipes)
    return recipes.map((recipe: Recipe) => ({ recipeId: recipe.id }));
}
