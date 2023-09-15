import { createClient } from '@supabase/supabase-js';
import type { Database } from '../_components/models/schema';
import { notFound } from 'next/navigation';
import { Ingredient, IngredientDao, Recipe, RecipeDao } from '../_components/models/models';

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: false
    }
  }
);

/* * * * * * * */
/* Ingredients */
/* * * * * * * */

export const fetchRecipes = async (): Promise<RecipeDao[]> => {
  const { data, error } = await supabase
      .from('recipes')
      .select('*');

  if (error || !data) {
    notFound();
  }

  return data as RecipeDao[];
};

export const createRecipe = async (name: string, description: string, user_id: string): Promise<RecipeDao> => {
  const { data, error } = await supabase
    .from('recipes')
    .insert({ name: name, description: description, user_id: user_id } as RecipeDao)
    .select()
    .single();

  if (error || !data) {
    notFound();
  }

  return data as RecipeDao;
}

export const deleteRecipe = async (uuid: string): Promise<void> => {
  const { data, error } = await supabase
    .from('recipes')
    .delete()
    .eq('uuid', uuid);

  if (error) {
    notFound();
  }
};

export const fetchRecipeWithIngredients = async (recipeUuid: string): Promise<Recipe> => {
  const { data, error } = await supabase
    .from('recipes')
    .select(`*,
      ingredients:ingredients (*, quantity:recipe_ingredients(quantity), unit:recipe_ingredients(unit))`)
    .eq('uuid', recipeUuid)
    .single();

  if (error || !data) {
    notFound();
  }

  return {
    recipe: {
      name: data.name,
      uuid: data.uuid,
      description: data.description,
      created_at: data.created_at,
      is_public: data.is_public,
      user_id: data.user_id
    },
    ingredients: data.ingredients.map((d) => {
      return {
        name: d.name,
        uuid: d.uuid,
        created_at: d.created_at,
        quantity: d.quantity[0].quantity,
        unit: d.unit[0].unit
      } as Ingredient
    }),
  } as Recipe;
};

export const removeIngredientFromRecipe = async (recipeUuid: string, ingredientUuid: string): Promise<void> => {
  const { error } = await supabase
    .from('recipe_ingredients')
    .delete()
    .eq('recipe_uuid', recipeUuid)
    .eq('ingredient_uuid', ingredientUuid);

  if (error) {
    notFound();
  }
};

export const addIngredientToRecipe = async (
  recipeUuid: string,
  ingredient: IngredientDao,
  quantity: number,
  unit: string,
): Promise<Ingredient> => {
  const { data, error } = await supabase
    .from('recipe_ingredients')
    .upsert({
      recipe_uuid: recipeUuid,
      ingredient_uuid: ingredient.uuid,
      quantity: quantity,
      unit: unit,
    })
    .select()
    .single();

  if (error || !data) {
    notFound();
  }

  return {
    name: ingredient.name,
    uuid: data.ingredient_uuid,
    quantity: data.quantity,
    unit: data.unit,
    created_at: ingredient.created_at
  };
};

/* * * * * * * */
/* Ingredients */
/* * * * * * * */

export const fetchAllIngredients = async (): Promise<IngredientDao[]> => {
  const { data, error } = await supabase
    .from('ingredients')
    .select('*');

  if (error || !data) {
    notFound();
  }

  return data as IngredientDao[];
};

export const updateIngredient = async (ingredient: IngredientDao): Promise<IngredientDao> => {
  const { data, error } = await supabase
    .from('ingredients')
    .update({ name: ingredient.name })
    .eq('uuid', ingredient.uuid)
    .select()
    .single();

  if (error || !data) {
    notFound();
  }

  return data as IngredientDao;
};

export const createIngredient = async (name: string): Promise<IngredientDao> => {
  const { data, error } = await supabase
    .from('ingredients')
    .insert({ name: name } as IngredientDao)
    .select()
    .single();

  if (error || !data) {
    notFound();
  }

  return data as IngredientDao;
};

export const deleteIngredient = async (uuid: string): Promise<void> => {
  const { data, error } = await supabase
    .from('ingredients')
    .delete()
    .eq('uuid', uuid);

  if (error) {
    notFound();
  }
};
