import { Recipe } from '../../../_components/models/models';
import { useRouter } from 'next/navigation';
import { FaTrashCan } from 'react-icons/fa6';
import styles from './recipe-item.module.scss';

export interface RecipeItemProps {
  recipe: Recipe
}

export const RecipeItem = (props: RecipeItemProps) => {
  const router = useRouter();

  return (
    <div className={styles.container} onClick={() => router.push(`/recipes/${props.recipe.uuid}`)}>
      <p>{props.recipe.name}</p>
      <p>{props.recipe.user_id}</p>
      <p>{props.recipe.is_public}</p>
      <p>{props.recipe.created_at}</p>
      <button onClick={() => router.push('/')}>
        <FaTrashCan style={{ color: 'red' }}/>
      </button>
    </div>
  );
}
