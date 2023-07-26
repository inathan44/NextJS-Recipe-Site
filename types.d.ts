type Recipe = {
  id: string;
  name: string;
  ingredients: Ingredient[];
  directions: string[];
  image: string;
  tags: string[];
  description?: string;
  cookTime?: number;
  prepTime?: number;
  servings?: number;
  owner?: string;
  likes?: number;
};

type Ingredient = {
  name: string;
  amount: number;
  measurement: string;
};

type RecipeSnippet = {
  recipeId: string;
  recipeName: string;
  recipeImage?: string;
  recipeDescription?: string;
  recipeTags?: string[];
  likes?: number;
};

type UserDoc = {};
