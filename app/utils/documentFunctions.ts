import { recipeRef, storage, db } from '@/firebaseConfig';
import { addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { v4 } from 'uuid';

export async function createRecipeDoc(
  imageUrl: string,
  ingredients: string[],
  directions: string[],
  name: string,
  setName: React.Dispatch<React.SetStateAction<string>>,
  setDirections: React.Dispatch<React.SetStateAction<string[]>>,
  setIngredients: React.Dispatch<React.SetStateAction<string[]>>,
  setImageUrl: React.Dispatch<React.SetStateAction<string>>,
  setAddDocLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setAddDocError: React.Dispatch<React.SetStateAction<string>>,
  description: string,
  tags: string,
  setTags: React.Dispatch<React.SetStateAction<string>>,
  setDescription: React.Dispatch<React.SetStateAction<string>>,
  amounts: number[],
  setAmounts: React.Dispatch<React.SetStateAction<number[]>>,
  measurements: string[],
  setMeasurements: React.Dispatch<React.SetStateAction<string[]>>
) {
  // Change this if to not add a recipe if it is missing any required fields
  if (!name || !ingredients || !directions[0]) {
    alert('must have ingredients, name, and directions');
    return;
  }
  try {
    setAddDocLoading(true);
    // Change ingredients to correct format
    // Change ingredients to correct format
    const newIngredients = ingredients.reduce(
      (acc: Ingredient[], cv: string, idx: number) => {
        acc.push({
          name: cv,
          amount: amounts[idx],
          measurement: measurements[idx],
        });
        return acc;
      },
      []
    );

    let newTags;
    newTags = tags.split(/,\s*|,/);

    // Checking type validity
    const recipeToAdd: Recipe = {
      name: name.toLowerCase(),
      ingredients: newIngredients,
      directions,
      image: imageUrl,
      tags: newTags,
      description,
    };

    let recipeWithoutUndefined = Object.keys(recipeToAdd)
      .filter((k) => recipeToAdd[k as keyof Recipe] != null)
      .reduce((a, k) => ({ ...a, [k]: recipeToAdd[k as keyof Recipe] }), {});

    await addDoc(recipeRef, recipeWithoutUndefined);

    setName('');
    setDirections(['']);
    setIngredients([]);
    setImageUrl('');
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

export async function editImages(
  image: File,
  setImageUrl: React.Dispatch<React.SetStateAction<string>>,
  setUploadLoading: React.Dispatch<React.SetStateAction<boolean>>,
  imageUrl: string
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

export function handleIngredientsChange(
  e: React.ChangeEvent<HTMLInputElement>,
  idx: number,
  ingredients: string[],
  setIngredients: React.Dispatch<React.SetStateAction<string[]>>
) {
  let data = [...ingredients];

  data[idx] = e.target.value;

  setIngredients(data);
}

export function handleMeasurementsChange(
  e: React.ChangeEvent<HTMLInputElement>,
  idx: number,
  measurements: string[],
  setMeasurements: React.Dispatch<React.SetStateAction<string[]>>
) {
  let data = [...measurements];

  data[idx] = e.target.value;

  setMeasurements(data);
}

export function handleAmountsChange(
  e: React.ChangeEvent<HTMLInputElement>,
  idx: number,
  amounts: number[],
  setAmounts: React.Dispatch<React.SetStateAction<number[]>>
) {
  let data = [...amounts];

  data[idx] = parseInt(e.target.value);

  setAmounts(data);
}

export function addDirection(
  setDirections: React.Dispatch<React.SetStateAction<string[]>>
) {
  setDirections((prev) => [...prev, '']);
}

export function addIngredient(
  setIngredients: React.Dispatch<React.SetStateAction<string[]>>
): void {
  setIngredients((prev) => [...prev, '']);
}

export async function updateRecipe(
  recipeId: string,
  name: string,
  ingredients: string[],
  directions: string[],
  imageUrl: string,
  tags: string,
  description: string,
  amounts: number[],
  measurements: string[]
) {
  const recipeRef = doc(db, 'recipes', recipeId);

  // Change ingredients to correct format
  const newIngredients = ingredients.reduce((acc: Ingredient[], cv, idx) => {
    acc.push({
      name: cv.toLowerCase(),
      amount: amounts[idx],
      measurement: measurements[idx].toLowerCase(),
    });
    return acc;
  }, []);

  let newTags;
  newTags = tags.split(/,\s*|,/);

  // Checking type validity
  const recipeToAdd: Recipe = {
    name: name.toLowerCase(),
    ingredients: newIngredients,
    directions,
    image: imageUrl,
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
