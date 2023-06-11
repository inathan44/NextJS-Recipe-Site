import { recipeRef, storage, db } from '@/firebaseConfig';
import { addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { v4 } from 'uuid';
import { RecipeSchema } from '../models/schema';

export async function createRecipeDoc(
  imageUrl: string,
  setImageUrl: React.Dispatch<React.SetStateAction<string>>,
  setAddDocLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setAddDocError: React.Dispatch<React.SetStateAction<string>>,
  data: RecipeSchema,
  reset: any
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
  };

  try {
    await addDoc(recipeRef, recipeToAdd);

    setImageUrl('');
    setAddDocError('');
    setAddDocLoading(false);
    const fileInput: any = document.getElementById('images');
    fileInput.value = null;

    reset();
  } catch (e) {
    console.log(e);
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
  } catch (e) {
    console.log(e);
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
  }
}
