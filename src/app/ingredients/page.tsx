'use client';

import { fetchAllIngredients } from '../../../_services/supabase';
import { useEffect, useState } from 'react';
import { Ingredient } from '../../../_components/models/models';
import { IngredientItem } from '@/app/ingredients/ingredient-item';

export default function Page() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])

  useEffect(() => {
    fetchAllIngredients().then((ingredients: Ingredient[]) => setIngredients(ingredients));
  }, []);

  return (
    <main>
      <div>Ingredients</div>
      {ingredients.map((ingredient, index) =>
        <IngredientItem ingredient={ingredient} key={index}/>
      )}
    </main>
  )
}
