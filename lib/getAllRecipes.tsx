import { getDocs } from 'firebase/firestore';
import { recipeRef } from '@/firebaseConfig';

export default async function getAllRecipes(searchTerm: string) {
  try {
    const snapshot = await getDocs(recipeRef);

    const recipes: Recipe[] = [];

    snapshot.docs.forEach((doc) => {
      if (doc.data().name.includes(searchTerm.toLowerCase())) {
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
      }
    });
    return recipes;
  } catch (e: any) {
    console.log('error from fetching recipes', e.message);
  }
}
