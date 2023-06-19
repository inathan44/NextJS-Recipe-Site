type Recipe = {
  id?: string;
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
};

type Ingredient = {
  name: string;
  amount: number;
  measurement: string;
};
