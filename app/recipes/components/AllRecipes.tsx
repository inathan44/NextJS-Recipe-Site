import RecipeCard from './RecipeCard';

type Props = {
  promise: Promise<Recipe[]>;
};

export default async function AllRecipes({ promise }: Props) {
  const recipes = await promise;

  const content = recipes.map((recipe) => {
    return <RecipeCard recipe={recipe} key={recipe.id} />;
  });

  return content;
}
