import { recipeRef, storage, db } from '@/firebaseConfig';
import { addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { v4 } from 'uuid';

export async function createRecipeDoc(
  imageUrls: string[],
  ingredients: string,
  directions: string[],
  name: string,
  setName: React.Dispatch<React.SetStateAction<string>>,
  setDirections: React.Dispatch<React.SetStateAction<string[]>>,
  setIngredients: React.Dispatch<React.SetStateAction<string>>,
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>,
  setAddDocLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setAddDocError: React.Dispatch<React.SetStateAction<string>>,
  description: string,
  tags: string,
  setTags: React.Dispatch<React.SetStateAction<string>>,
  setDescription: React.Dispatch<React.SetStateAction<string>>
) {
  // Change this if to not add a recipe if it is missing any required fields
  if (!name || !ingredients || !directions[0]) {
    alert('must have ingredients, name, and directions');
    return;
  }
  try {
    setAddDocLoading(true);
    // Change ingredients to correct format
    const newIngredients = ingredients.split(/,\s*|,/);
    let newTags;
    newTags = tags.split(/,\s*|,/);

    // Checking type validity
    const recipeToAdd: Recipe = {
      name,
      ingredients: newIngredients,
      directions,
      images: imageUrls,
      tags: newTags,
      description,
    };

    let recipeWithoutUndefined = Object.keys(recipeToAdd)
      .filter((k) => recipeToAdd[k as keyof Recipe] != null)
      .reduce((a, k) => ({ ...a, [k]: recipeToAdd[k as keyof Recipe] }), {});

    await addDoc(recipeRef, recipeWithoutUndefined);

    setName('');
    setDirections(['']);
    setIngredients('');
    setImageUrls([]);
    setTags('');
    setDescription('');
    setAddDocError('');
    setAddDocLoading(false);
    const fileInput: any = document.getElementById('images');
    fileInput.value = null;
  } catch (e: any) {
    setAddDocError(e.message);
    setAddDocLoading(false);
    console.log('Adding recipe doc error:', e);
  }
}

export async function uploadImages(
  images: FileList,
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>,
  setUploadLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (!images) return;

  const imagesArr = Array.from(images);
  setUploadLoading(true);
  try {
    const fileUrls = [];
    for (const file of imagesArr) {
      const storageRef = ref(storage, `${file.name + v4()}`);

      // Upload the images to Firebase Storage
      const snapshot = await uploadBytesResumable(storageRef, file);

      // Get the download URL of the uploaded images
      const downloadUrl = await getDownloadURL(snapshot.ref);

      fileUrls.push(downloadUrl);
    }
    setUploadLoading(false);
    // Update the state with the download URL
    setImageUrls(fileUrls);
  } catch (e: any) {
    setUploadLoading(false);
    console.log(e);
  }
}

export async function editImages(
  images: FileList,
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>,
  setUploadLoading: React.Dispatch<React.SetStateAction<boolean>>,
  imageUrls: string[]
) {
  if (!images) return;

  const imagesArr = Array.from(images);
  setUploadLoading(true);
  try {
    const fileUrls = [...imageUrls];
    for (const file of imagesArr) {
      const storageRef = ref(storage, `${file.name + v4()}`);

      // Upload the images to Firebase Storage
      const snapshot = await uploadBytesResumable(storageRef, file);

      // Get the download URL of the uploaded images
      const downloadUrl = await getDownloadURL(snapshot.ref);

      fileUrls.push(downloadUrl);
    }

    setUploadLoading(false);
    // Update the state with the download URL
    setImageUrls(fileUrls);
  } catch (e: any) {
    setUploadLoading(false);
    console.log(e);
  }
}

export function handleDirectionsChange(
  e: React.ChangeEvent<HTMLInputElement>,
  idx: number,
  directions: string[],
  setDirections: React.Dispatch<React.SetStateAction<string[]>>
) {
  let data = [...directions];

  data[idx] = e.target.value;

  setDirections(data);
}

export function addDirection(
  setDirections: React.Dispatch<React.SetStateAction<string[]>>
) {
  setDirections((prev) => [...prev, '']);
}

export async function updateRecipe(
  recipeId: string,
  name: string,
  ingredients: string,
  directions: string[],
  imageUrls: string[],
  tags: string,
  description: string
) {
  const recipeRef = doc(db, 'recipes', recipeId);

  // Change ingredients to correct format
  const newIngredients = ingredients.split(/,\s*|,/);
  let newTags;
  newTags = tags.split(/,\s*|,/);

  // Checking type validity
  const recipeToAdd: Recipe = {
    name,
    ingredients: newIngredients,
    directions,
    images: imageUrls,
    tags: newTags,
    description,
  };

  let recipeWithoutUndefined = Object.keys(recipeToAdd)
    .filter((k) => recipeToAdd[k as keyof Recipe] != null)
    .reduce((a, k) => ({ ...a, [k]: recipeToAdd[k as keyof Recipe] }), {});

  try {
    await updateDoc(recipeRef, recipeWithoutUndefined);
  } catch (e: any) {
    console.log(e.message);
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
