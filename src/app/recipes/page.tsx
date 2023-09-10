'use client';

import { fetchRecipes } from '../../../_services/supabase';
import { useEffect, useState } from 'react';
import { RecipeDao } from '../../../_components/models/models';
import { RecipeItem } from '@/app/recipes/recipe-item';
import { Button } from '@nextui-org/button';

export default function Page() {
  const [recipes, setRecipes] = useState<RecipeDao[]>([]);

  useEffect(() => {
    fetchRecipes().then((recipes: RecipeDao[]) => setRecipes(recipes));
  }, []);

  return (
    <main>
      <Button/>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <div>Recipes</div>
      {recipes.map((recipe, index) =>
        <RecipeItem recipe={recipe} key={index}/>
      )}
    </main>
  )
}
