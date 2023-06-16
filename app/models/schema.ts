import { z } from 'zod';

const ingredientSchema = z
  .string({ invalid_type_error: 'must be a string' })
  .trim()
  .min(1, { message: "Can't be empty" })
  .toLowerCase();

const amountSchema = z
  .string()
  .refine(
    (value) => {
      const numericValue = parseFloat(value);
      return !isNaN(numericValue) && numericValue >= 0;
    },
    { message: 'Must be a number above 0', path: [] }
  )
  .transform((value) => parseFloat(value));

const measurementSchema = z
  .string({ invalid_type_error: 'must be a string' })
  .trim()
  .min(1, { message: "Can't be empty" })
  .toLowerCase();

const ingredientsSchema = z.object({
  name: ingredientSchema,
  amount: amountSchema,
  measurement: measurementSchema,
});

const directionsSchema = z.object({ direction: z.string() });

export const recipeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Please enter name' })
    .toLowerCase(),
  directions: z.array(directionsSchema),
  ingredients: z.array(ingredientsSchema),
  image: z.string().optional(),
  tags: z
    .string()
    .optional()
    .transform((value) => value?.split(/,\s*|,/)),
  description: z.string().optional(),
  cookTime: z
    .string()
    .refine(
      (value) => {
        if (value === '') return true;
        const numericValue = parseFloat(value);
        return !isNaN(numericValue) && numericValue >= 0;
      },
      { message: 'Must be a number above 0', path: [] }
    )
    .transform((value) => {
      if (value === '') return undefined;
      return parseFloat(value);
    })
    .optional(),
  prepTime: z
    .string()
    .refine(
      (value) => {
        if (value === '') return true;
        const numericValue = parseFloat(value);
        return !isNaN(numericValue) && numericValue >= 0;
      },
      { message: 'Must be a number above 0', path: [] }
    )
    .transform((value) => {
      if (value === '') return undefined;
      return parseFloat(value);
    })
    .optional(),
  servings: z
    .string()
    .refine(
      (value) => {
        if (value === '') return true;
        const numericValue = parseFloat(value);
        return !isNaN(numericValue) && numericValue >= 0;
      },
      { message: 'Must be a number above 0', path: [] }
    )
    .transform((value) => {
      if (value === '') return undefined;
      return parseFloat(value);
    })
    .optional(),
});

export type RecipeSchema = z.infer<typeof recipeSchema>;
