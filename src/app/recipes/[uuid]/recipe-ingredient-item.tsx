import styles from './recipe-ingredient-item.module.scss';
import { Ingredient } from '../../../../_components/models/models';

export interface RecipeIngredientItemProps {
  ingredient: Ingredient
}

export const RecipeIngredientItem = (props: RecipeIngredientItemProps) => {
  return (
    <div className={styles.container}>
      <p>{props.ingredient.name} - {props.ingredient.quantity} {props.ingredient.unit}</p>
    </div>
  );
}
