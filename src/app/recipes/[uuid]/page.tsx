'use client';

import { useEffect, useState } from 'react';
import { RecipeItem } from '@/app/recipes/recipe-item';
import { fetchRecipe } from '../../../../_services/supabase';
import { Recipe } from '../../../../_components/models/models';

export default function Page({ params }: { params: { uuid: string }}) {
  const [recipe, setRecipe] = useState<Recipe>();

  useEffect(() => {
    fetchRecipe(params.uuid).then((recipes: Recipe) => setRecipe(recipes));
  }, []);

  return (
    <main>
      <div>Recipe</div>
      {recipe && <RecipeItem recipe={recipe}/>}
    </main>
  )
}
