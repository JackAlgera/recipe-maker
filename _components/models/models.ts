export const UNITS = [
  'mL',
  'g',
  ''
];

export type Unit = 'g' | 'mL' | undefined | null;

export const fromUnit = (unit: Unit) => {
  if (unit == undefined) {
    return '';
  }

  return unit as string;
};

export const toUnit = (unit: String | undefined | null): Unit => unit as Unit;

export interface RecipeDao {
  uuid: string;
  name: string;
  description: string;
  user_id: string;
  is_public: boolean;
  created_at: string;
}

export interface Recipe extends RecipeDao {
  ingredients: Ingredient[];
}

export interface IngredientDao {
  uuid: string;
  name: string;
  created_at: string;
  unit: Unit;
}

export interface Ingredient extends IngredientDao {
  quantity: number;
}

export interface PlannedRecipeDao {
  created_on: string | null;
  is_done: boolean | null;
  recipe_uuid: string;
  times: number | null;
  user_id: string;
}

export interface PlannedRecipe extends Recipe {
  times: number;
}
