import { getDocs } from 'firebase/firestore';
import { recipeRef } from '@/firebaseConfig';

export default async function getAllRecipes(searchTerm?: string) {
  const snapshot = await getDocs(recipeRef);

  const recipes: Recipe[] = [];

  if (!searchTerm) {
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

  snapshot.docs.forEach((doc) => {
    if (doc.data().name.includes(searchTerm)) {
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
    return recipes;
  });
  return recipes;
}
