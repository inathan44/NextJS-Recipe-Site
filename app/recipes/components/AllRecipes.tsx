import RecipeCard from './RecipeCard';

type Props = {
  promise: Promise<Recipe[]>;
};

export default async function AllRecipes({ promise }: Props) {
  const recipes = await promise;

  const content = recipes.map((recipe) => {
    const recipeProp: RecipeSnippet = {
      recipeId: recipe.id!,
      recipeName: recipe.name,
      recipeDescription: recipe.description,
      recipeImage: recipe.image,
      recipeTags: recipe.tags,
    };
    return <RecipeCard recipe={recipeProp} key={recipe.id} />;
  });

  return content;
}
