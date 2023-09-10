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

export const fetchRecipes = async (): Promise<RecipeDao[]> => {
  const { data, error } = await supabase
      .from('recipes')
      .select('*');

  if (error || !data) {
    notFound();
  }

  return data as RecipeDao[];
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

export const fetchAllIngredients = async (): Promise<IngredientDao[]> => {
  const { data, error } = await supabase
    .from('ingredients')
    .select('*');

  if (error || !data) {
    notFound();
  }

  return data as IngredientDao[];
};

export const createIngredient = async (ingredient: IngredientDao): Promise<IngredientDao> => {
  const { data, error } = await supabase
    .from('ingredients')
    .insert(ingredient)
    .select()
    .single();

  if (error || !data) {
    notFound();
  }

  return data as IngredientDao;
}
