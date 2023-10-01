'use client';

import {
  createPlannedRecipe,
  deletePlannedRecipe,
  fetchPlannedRecipes,
  fetchRecipes,
  updatePlannedRecipe
} from '../../../_services/supabase';
import React, { useEffect, useState } from 'react';
import { Ingredient, PlannedRecipe, RecipeDao } from '../../../_components/models/models';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useAsyncList } from 'react-stately';
import { PlannedRecipes } from '@/app/my-week/planned-recipes';
import { GroceriesList } from '@/app/my-week/groceries-list';
import { flattenIngredients } from '../../../_services/ingredientHelper.service';
import { Spinner } from '@nextui-org/react';

export default function Page() {
  const { user, error, isLoading } = useUser();

  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [allRecipes, setAllRecipes] = useState<RecipeDao[]>([]);

  const onDeletePlannedRecipe = (recipeUuid: string) => {
    if (!user) return;

    deletePlannedRecipe(user.email!, recipeUuid)
      .then(plannedRecipes.reload);
  }

  const onCreatePlannedRecipe = (recipeUuid: string, times: number) => {
    createPlannedRecipe(recipeUuid, user!.email!, times)
      .then(plannedRecipes.reload);
  }

  const onUpdatePlannedRecipe = async (recipeUuid: string, times: number) => {
    await updatePlannedRecipe(user!.email!, recipeUuid, times);
    return plannedRecipes.reload();
  }

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
    setIngredients(flattenIngredients(plannedRecipes.items));
  }, [plannedRecipes.items]);

  useEffect(() => {
    if (!isLoading) {
      plannedRecipes.reload();
    }
  }, [isLoading]);

  useEffect(() => {
    fetchRecipes().then((recipes) => setAllRecipes(recipes));
  }, []);

  if (!user) {
    return <Spinner />;
  }

  return (
    <main>
      <PlannedRecipes recipes={plannedRecipes}
                      onDeleteRecipe={onDeletePlannedRecipe}
                      onUpdateRecipe={onUpdatePlannedRecipe}
                      onCreateRecipe={onCreatePlannedRecipe}
                      availableRecipes={allRecipes
                        .filter((a) => plannedRecipes.items
                          .findIndex((b) => b.uuid === a.uuid) === -1)}
      />
      <GroceriesList ingredients={ingredients} />
    </main>
  );
}
