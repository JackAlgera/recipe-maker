import { Ingredient, PlannedRecipe } from '../_components/models/models';

export const flattenIngredients = (plannedRecipes: PlannedRecipe[]): Ingredient[] => {
  const ingredients = plannedRecipes
    .flatMap((recipe) => recipe.ingredients);
  const ingredientMap = new Map<String, Ingredient>();

  ingredients.forEach(ingredient => {
    const uuid = ingredient.uuid;
    ingredientMap.set(uuid, !ingredientMap.has(uuid) ?
      ingredient : mergeIngredients(ingredient, ingredientMap.get(uuid)!));
  });

  return Array.from(ingredientMap.values());
}

const mergeIngredients = (a: Ingredient, b: Ingredient): Ingredient => {
  if (a.uuid !== b.uuid) {
    throw new Error(`Not the same ingredients: ${a.uuid} and ${b.uuid}`);
  }

  return {
    ...a,
    quantity: a.quantity + b.quantity,
  };
}
