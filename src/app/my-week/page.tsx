'use client';

import { fetchPlannedRecipes } from '../../../_services/supabase';
import React, { useEffect, useState } from 'react';
import { Ingredient, PlannedRecipe } from '../../../_components/models/models';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useAsyncList } from 'react-stately';
import { PlannedRecipes } from '@/app/my-week/planned-recipes';
import { GroceriesList } from '@/app/my-week/groceries-list';
import { flattenIngredients } from '../../../_services/ingredientHelper.service';

const COLUMN_SIZE = 200;

export default function Page() {
  const { user, error, isLoading } = useUser();

  const [ingredients, setIngredients] = useState<Ingredient[]>([])

  let plannedRecipes = useAsyncList<PlannedRecipe>({
    async load() {
      return { items: user ? await fetchPlannedRecipes(user.email!) : [] };
    },
    sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          return a.name.localeCompare(b.name) * (sortDescriptor.direction === 'ascending' ? -1 : 1);
        })
      };
    },
    getKey: item => item.uuid,
  });

  useEffect(() => {
    console.log('Inside useEffect ingredients');
    setIngredients(flattenIngredients(plannedRecipes.items));
  }, [plannedRecipes.items]);

  useEffect(() => {
    console.log('Inside useEffect recipes');
    if (!isLoading) {
      plannedRecipes.reload();
    }
  }, [isLoading]);

  return (
    <main>
      <PlannedRecipes recipes={plannedRecipes} />
      <GroceriesList ingredients={ingredients} />
    </main>
  )
}
