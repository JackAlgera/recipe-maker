import { Ingredient, Recipe } from '../../../_components/models/models';

export interface IngredientItemProps {
  ingredient: Ingredient
}

export const IngredientItem = (props: IngredientItemProps) => {
  return (
    <div className={'container'}>
      <p>{props.ingredient.name}</p>
      <p>{props.ingredient.created_at}</p>
    </div>
  );
}
