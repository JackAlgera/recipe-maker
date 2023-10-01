import { Ingredient, PlannedRecipe } from '../_components/models/models';

export const flattenIngredients = (plannedRecipes: PlannedRecipe[]): Ingredient[] => {
  const ingredientMap = new Map<String, Ingredient>();

  plannedRecipes.forEach((plannedRecipe) => {
    plannedRecipe.ingredients.forEach(ingredient => {
      const uuid = ingredient.uuid;
      const updateIngredient = {
        ...ingredient,
        quantity: ingredient.quantity * plannedRecipe.times
      };

      ingredientMap.set(uuid, !ingredientMap.has(uuid) ?
        updateIngredient :
        mergeIngredients(updateIngredient, ingredientMap.get(uuid)!));
    });
  })

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
