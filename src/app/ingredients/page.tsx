'use client';

import { fetchAllIngredients } from '../../../_services/supabase';
import { useEffect, useState } from 'react';
import { IngredientDao } from '../../../_components/models/models';
import { IngredientItem } from '@/app/ingredients/ingredient-item';
import { Button } from '@nextui-org/button';

export default function Page() {
  const [ingredients, setIngredients] = useState<IngredientDao[]>([])

  useEffect(() => {
    fetchAllIngredients().then((ingredients: IngredientDao[]) => setIngredients(ingredients));
  }, []);

  return (
    <main>
      <Button/>
      <div>Ingredients</div>
      {ingredients.map((ingredient, index) =>
        <IngredientItem ingredient={ingredient} key={index}/>
      )}
    </main>
  )
}
