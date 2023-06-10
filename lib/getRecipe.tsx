import { db } from '@/firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';

export default async function getRecipe(
  recipeId: string
): Promise<Recipe | undefined> {
  try {
    const recipeRef = doc(db, 'recipes', recipeId);

    const recipe = await getDoc(recipeRef);

    return {
      id: recipe.id,
      name: '',
      directions: [],
      ingredients: [],
      image: '',
      tags: [],
      description: '',
      ...recipe.data(),
    };
  } catch (error: any) {
    console.log(error.message);
  }
}
