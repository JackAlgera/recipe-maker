import { createClient } from '@supabase/supabase-js';
import type { Database } from '../_components/models/schema';
import { notFound } from 'next/navigation';
import { Ingredient, IngredientDao, PlannedRecipe, Recipe, RecipeDao, Unit } from '../_components/models/models';

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
      ingredients:ingredients(*, quantity:recipe_ingredients(quantity))`)
    .eq('uuid', recipeUuid)
    .single();

  if (error || !data) {
    notFound();
  }

  return {
    name: data.name,
    uuid: data.uuid,
    description: data.description,
    created_at: data.created_at,
    is_public: data.is_public,
    user_id: data.user_id,
    ingredients: mapIngredients(data.ingredients),
  } as Recipe;
};

// export const fetchRecipesWithIngredients = async (userId: string): Promise<Recipe[]> => {
//   const { data, error } = await supabase
//     .from('recipes')
//     .select(`*,
//       ingredients:ingredients(*, quantity:recipe_ingredients(quantity))`)
//     .eq('user_id', userId)
//     .single();
//
//   if (error || !data) {
//     notFound();
//   }
//
//   return {
//     name: data.name,
//     uuid: data.uuid,
//     description: data.description,
//     created_at: data.created_at,
//     is_public: data.is_public,
//     user_id: data.user_id,
//     ingredients: mapIngredients(data.ingredients),
//   } as Recipe;
// };

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
  quantity: number
): Promise<Ingredient> => {
  const { data, error } = await supabase
    .from('recipe_ingredients')
    .upsert({
      recipe_uuid: recipeUuid,
      ingredient_uuid: ingredient.uuid,
      quantity: quantity
    })
    .select()
    .single();

  if (error || !data) {
    notFound();
  }

  return {
    uuid: data.ingredient_uuid,
    name: ingredient.name,
    quantity: data.quantity,
    created_at: ingredient.created_at,
    unit: ingredient.unit
  };
};

/* * * * * * * */
/* Ingredients */
/* * * * * * * */

export const fetchAllIngredients = async (): Promise<IngredientDao[]> => {
  const { data, error } = await supabase
    .from('ingredients')
    .select('*')
    .order('name', { ascending: true });

  if (error || !data) {
    notFound();
  }

  return data as IngredientDao[];
};

export const updateIngredient = async (ingredient: IngredientDao): Promise<IngredientDao> => {
  const { data, error } = await supabase
    .from('ingredients')
    .update({ name: ingredient.name, unit: ingredient.unit })
    .eq('uuid', ingredient.uuid)
    .select()
    .single();
  if (error || !data) {
    notFound();
  }

  return data as IngredientDao;
};

export const createIngredient = async (name: string, unit: Unit): Promise<IngredientDao> => {
  const { data, error } = await supabase
    .from('ingredients')
    .insert({ name: name, unit: unit } as IngredientDao)
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

/* * * * * * * * * */
/* Planned recipes */
/* * * * * * * * * */

export const fetchPlannedRecipes = async (userId: string): Promise<PlannedRecipe[]> => {
  const { data, error } = await supabase
    .from('planned_recipes')
    .select(`*,
      recipe:recipes(*, ingredients:ingredients(*, quantity:recipe_ingredients(quantity)))`)
    .eq('user_id', userId);

  if (error || !data) {
    notFound();
  }

  return data.map(d  => {
    return {
      is_public: d.recipe!.is_public,
      created_at: d.recipe!.created_at,
      description: d.recipe!.description,
      name: d.recipe!.name,
      uuid: d.recipe!.uuid,
      is_done: d.is_done,
      times: d.times,
      user_id: d.user_id,
      ingredients: mapIngredients(d.recipe!.ingredients)
    } as PlannedRecipe
  });
};

const mapIngredients = (data: {
  name: string,
  uuid: string,
  created_at: string,
  quantity: { quantity: number }[],
  unit: Unit
}[]): Ingredient[] => {
  return data.map((d) => {
    return {
      name: d.name,
      uuid: d.uuid,
      created_at: d.created_at,
      quantity: d.quantity[0].quantity,
      unit: d.unit
    } as Ingredient
  });
};
