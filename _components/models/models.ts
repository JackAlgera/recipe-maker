export type Unit = 'g' | 'mL' | 'L' | 'mg' | 'kg' | null | undefined;

export enum UnitE {
  MILLIGRAM = 'mg',
  GRAM = 'g',
  KILOGRAM = 'kg',
  MILLILITER = 'mL',
  LITER = 'L'
}

export interface RecipeDao {
  uuid: string;
  name: string;
  description: string;
  user_id: string;
  is_public: boolean;
  created_at: string;
}

export interface IngredientDao {
  uuid: string;
  name: string;
  created_at: string;
}

export interface Recipe {
  recipe: RecipeDao;
  ingredients: Ingredient[];
}

export interface Ingredient {
  uuid: string;
  name: string;
  created_at: string;
  quantity: number;
  unit: Unit;
}
