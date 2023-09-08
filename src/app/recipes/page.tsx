'use client';

import { fetchRecipes } from '../../../_services/supabase';
import { useEffect, useState } from 'react';
import { Recipe } from '../../../_components/models/models';
import { RecipeItem } from '@/app/recipes/recipe-item';

export default function Page() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetchRecipes().then((recipes: Recipe[]) => setRecipes(recipes));
  }, []);

  return (
    <main>
      <div>Recipes</div>
      {recipes.map((recipe, index) =>
        <RecipeItem recipe={recipe} key={index}/>
      )}
    </main>
  )
}
