import { recipeRef, storage, db, userRef } from '@/firebaseConfig';
import {
  FieldValue,
  Firestore,
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { v4 } from 'uuid';
import { RecipeSchema } from '../models/schema';
import { User } from 'firebase/auth';

export async function createRecipeDoc(
  imageUrl: string,
  setImageUrl: React.Dispatch<React.SetStateAction<string>>,
  setAddDocLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setAddDocError: React.Dispatch<React.SetStateAction<string>>,
  data: RecipeSchema,
  reset: any,
  owner: string,
  user: User
) {
  setAddDocLoading(true);

  // Checking type validity
  const recipeToAdd: Recipe = {
    name: data.name,
    ingredients: data.ingredients,
    directions: data.directions.map(({ direction }) => direction),
    image: imageUrl,
    tags: data.tags || [],
    description: data.description,
    cookTime: data.cookTime,
    prepTime: data.prepTime,
    servings: data.servings,
    owner,
    likes: 0,
  };

  try {
    const batch = writeBatch(db);

    const recipeDocRef = doc(recipeRef);
    batch.set(recipeDocRef, recipeToAdd);

    const userDoc = doc(db, 'users', user.uid);
    batch.update(userDoc, {
      recipes: arrayUnion(recipeDocRef.id),
    });

    setImageUrl('');
    setAddDocError('');
    setAddDocLoading(false);
    const fileInput: any = document.getElementById('images');
    fileInput.value = null;

    await batch.commit();

    reset();
  } catch (e) {
    console.log('<><><><><>', e);
    throw new Error('Error adding recipe, try again later.');
  }
}

export async function uploadImages(
  image: File,
  setImageUrl: React.Dispatch<React.SetStateAction<string>>,
  setUploadLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (!image) return;

  setUploadLoading(true);

  const storageRef = ref(storage, `${image.name + v4()}`);

  // Upload the images to Firebase Storage
  const snapshot = await uploadBytesResumable(storageRef, image);

  // Get the download URL of the uploaded images
  const downloadUrl = await getDownloadURL(snapshot.ref);

  setUploadLoading(false);
  // Update the state with the download URL
  setImageUrl(downloadUrl);
}

export async function editImages(
  image: File,
  setImageUrl: React.Dispatch<React.SetStateAction<string>>,
  setUploadLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (!image) return;

  setUploadLoading(true);
  try {
    const storageRef = ref(storage, `${image.name + v4()}`);

    // Upload the images to Firebase Storage
    const snapshot = await uploadBytesResumable(storageRef, image);

    // Get the download URL of the uploaded images
    const downloadUrl = await getDownloadURL(snapshot.ref);

    setUploadLoading(false);
    // Update the state with the download URL
    setImageUrl(downloadUrl);
  } catch (e: any) {
    setUploadLoading(false);
    console.log(e);
  }
}

export async function updateRecipe(
  imageUrl: string,
  setAddDocLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setAddDocError: React.Dispatch<React.SetStateAction<string>>,
  data: RecipeSchema,
  recipeId: string
) {
  setAddDocLoading(true);

  const recipeRef = doc(db, 'recipes', recipeId);

  // Checking type validity
  const recipeToAdd: Recipe = {
    name: data.name,
    ingredients: data.ingredients,
    directions: data.directions.map(({ direction }) => direction),
    image: imageUrl,
    tags: data.tags || [],
    description: data.description,
    cookTime: data.cookTime,
    prepTime: data.prepTime,
    servings: data.servings,
  };

  try {
    await updateDoc(recipeRef, recipeToAdd);
    setAddDocLoading(false);
  } catch (e: any) {
    console.log(e);
    setAddDocLoading(false);
    throw new Error(e.message);
  }
}

export async function deleteRecipe(
  recipeId: string,
  router: AppRouterInstance
) {
  const recipeRef = doc(db, 'recipes', recipeId);
  try {
    await deleteDoc(recipeRef);
    router.push('/recipes');
  } catch (e: any) {
    console.log(e);
    throw new Error('error');
  }
}

export async function getLikedRecipes(userId: string) {
  const userDoc = doc(db, 'users', userId);
  const userSnapshot = await getDoc(userDoc);
  return userSnapshot.data()?.likedRecipes || [];
  return [];
}

export async function isRecipeLiked(
  userId: string,
  recipeId: string
): Promise<boolean> {
  try {
    const userDoc = doc(db, 'users', userId);
    const likeRef = doc(userDoc, 'likes', recipeId);
    const likeDoc = await getDoc(likeRef);

    return likeDoc.exists();
  } catch (e: any) {
    console.log('eeeee', e);
    throw new Error(e.message);
    return false;
  }
}

export async function likeRecipe(
  recipeId: string,
  userId: string,
  recipeName: string,
  recipeImage: string
) {
  try {
    const batch = writeBatch(db);

    const userDoc = doc(db, 'users', userId);
    const likeRef = doc(userDoc, 'likes', recipeId);

    const recipeRef = doc(db, 'recipes', recipeId);

    if (await isRecipeLiked(userId, recipeId)) {
      // batch.update(userDoc, {
      //   likedRecipes: arrayRemove(recipeId),
      // });
      batch.update(recipeRef, { likes: increment(-1) });

      batch.delete(likeRef);
    } else {
      // batch.update(userDoc, {
      //   likedRecipes: arrayUnion(recipeId),
      // });
      batch.update(recipeRef, { likes: increment(1) });

      batch.set(likeRef, { recipeId, recipeName, recipeImage });
    }

    await batch.commit();
  } catch (e) {
    console.log(e);
  }
}

export async function isOwner(
  userId: string,
  recipeId: string
): Promise<boolean> {
  const recipeRef = doc(db, 'recipes', recipeId);

  const recipeDoc = await getDoc(recipeRef);

  return recipeDoc.data()?.owner === userId;
}

export async function getUserRecipes(userId: string) {
  const q = query(recipeRef, where('owner', '==', userId));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    return querySnapshot.docs.map((doc) => doc.data());
  }
}
