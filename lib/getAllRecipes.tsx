import { getDocs } from 'firebase/firestore';
import { recipeRef } from '@/firebaseConfig';

export default async function getAllRecipes() {
  const snapshot = await getDocs(recipeRef);

  const recipes: Partial<Recipe>[] = [];

  snapshot.docs.forEach((doc) => {
    recipes.push({
      id: doc.id,
      name: '',
      ingredients: [],
      directions: [],
      image: '',
      tags: [],
      description: '',
      ...doc.data(),
    });
  });
  return recipes;
}
