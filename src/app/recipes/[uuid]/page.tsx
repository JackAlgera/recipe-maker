'use client';

import { useEffect, useState } from 'react';
import { Recipe } from '../../../../_components/models/models';
import styles from './page.module.scss';
import { fetchRecipeWithIngredients } from '../../../../_services/supabase';
import { RecipeIngredientItem } from '@/app/recipes/[uuid]/recipe-ingredient-item';

export default function Page({ params }: { params: { uuid: string }}) {
  const [recipe, setRecipe] = useState<Recipe>();

  useEffect(() => {
    fetchRecipeWithIngredients(params.uuid).then((recipe: Recipe) => {
      console.log(recipe);
      setRecipe(recipe);
    });
  }, [params.uuid]);

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.recipeContainer}>
          {recipe && (
            <>
              <h3>{recipe.recipe.name}</h3>
              <p>{recipe.recipe.description}</p>
            </>
          )}
        </div>
        <div className={styles.ingredientsContainer}>
          {recipe && recipe.ingredients.map((ingredient) => (
            <RecipeIngredientItem ingredient={ingredient} key={ingredient.name}/>
          ))}
        </div>
      </div>
    </main>
  )
}
