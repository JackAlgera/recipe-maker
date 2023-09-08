import { createClient } from '@supabase/supabase-js';
import type { Database } from '../_components/models/schema';
import { notFound } from 'next/navigation';
import { Ingredient, Recipe } from '../_components/models/models';

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: false
    }
  }
);

export const fetchRecipes = async (): Promise<Recipe[]> => {
  const { data, error } = await supabase
      .from('recipes')
      .select('*');

  if (error || !data) {
    notFound();
  }

  return data as Recipe[];
};

export const fetchRecipe = async (uuid: string): Promise<Recipe> => {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('uuid', uuid)
    .single();

  if (error || !data) {
    notFound();
  }

  return data as Recipe;
};

export const deleteRecipe = async (uuid: string): Promise<void> => {
  const { data, error } = await supabase
    .from('recipes')
    .delete()
    .eq('uuid', uuid);

  if (error || !data) {
    notFound();
  }
};

export const fetchAllIngredients = async (): Promise<Ingredient[]> => {
  const { data, error } = await supabase
    .from('ingredients')
    .select('*');

  if (error || !data) {
    notFound();
  }

  return data as Ingredient[];
};
