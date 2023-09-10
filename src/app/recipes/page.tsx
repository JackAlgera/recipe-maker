'use client';

import { createRecipe, deleteRecipe, fetchRecipes } from '../../../_services/supabase';
import { useEffect, useState } from 'react';
import { RecipeDao } from '../../../_components/models/models';
import { RecipeItem } from '@/app/recipes/recipe-item';
import { RecipeModal } from '../../../_components/modals/recipe-modal';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Page() {
  const [recipes, setRecipes] = useState<RecipeDao[]>([]);
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    fetchRecipes().then((recipes: RecipeDao[]) => setRecipes(recipes));
  }, []);

  const onDelete = (recipeUuid: string) => {
    deleteRecipe(recipeUuid)
      .then(() => {
        setRecipes([...recipes.filter((r) => r.uuid !== recipeUuid)]);
      })
      .catch(() => console.log('Oh no, something went wrong'));
  }

  const onCreate = (name: string, description: string) => {
    createRecipe(name, description, user!.email)
      .then((recipe: RecipeDao) => setRecipes([...recipes, recipe]));
  }

  return (
    <main>
      <div className='flex items-center'>
        <p className='m-4 text-4xl'>Recipes</p>
        {user && <RecipeModal onCreate={onCreate} />}
      </div>
      <div className='grid grid-cols-3 gap-2'>
        {recipes.map((recipe, index) =>
          <RecipeItem recipe={recipe} onDelete={() => onDelete(recipe.uuid)} key={index}/>
        )}
      </div>
    </main>
  )
}
