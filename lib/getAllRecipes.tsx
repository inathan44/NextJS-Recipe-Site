import { getDocs } from 'firebase/firestore';
import { recipeRef } from '@/firebaseConfig';

export default async function getAllRecipes() {
  try {
    const snapshot = await getDocs(recipeRef);

    const recipes: Recipe[] = [];

    snapshot.docs.forEach((doc) => {
      recipes.push({
        id: doc.id,
        name: '',
        ingredients: [],
        directions: [],
        images: [],
        tags: [],
        description: '',
        ...doc.data(),
      });
    });
    return recipes;
  } catch (e: any) {
    console.log('error from fetching recipes', e.message);
  }
}
