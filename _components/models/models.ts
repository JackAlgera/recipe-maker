export const UNITS = [
  'mL',
  'g',
  'x'
];

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
  unit: string;
}

export interface Ingredient extends IngredientDao {
  quantity: number;
}

export interface PlannedRecipe extends Recipe {
  times: number;
}
