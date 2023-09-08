import { createClient } from '@supabase/supabase-js';
import type { Database } from '../_components/models/schema';
import { notFound } from 'next/navigation';
import { Recipe } from '../_components/models/models';

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
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
