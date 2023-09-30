'use client';

import React, { useEffect, useState } from 'react';
import { Ingredient, IngredientDao, RecipeDao } from '../../../../_components/models/models';
import {
  addIngredientToRecipe,
  fetchAllIngredients,
  fetchRecipeWithIngredients,
  removeIngredientFromRecipe
} from '../../../../_services/supabase';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { DeleteButton } from '../../../../_components/inputs/buttons';
import { Divider, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { RecipeIngredientModal } from '../../../../_components/modals/recipe-ingredient-modal';
import { useAsyncList } from 'react-stately';
import { RecipeItem } from '@/app/recipes/recipe-item';

const COLUMN_SIZE = 200;

export default function Page({ params }: { params: { uuid: string }}) {
  const [recipe, setRecipe] = useState<RecipeDao>();
  const [allIngredients, setAllIngredients] = useState<IngredientDao[]>([]);

  let ingredientsList = useAsyncList<Ingredient>({
    async load() {
        const newRecipe = await fetchRecipeWithIngredients(params.uuid);
        setRecipe(newRecipe);
        return { items: newRecipe.ingredients };
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
    fetchAllIngredients().then((ingredients) => setAllIngredients(ingredients));
  }, []);

  const onAddIngredient = (ingredient: IngredientDao, quantity: number) => {
    if (!recipe) return;

    addIngredientToRecipe(recipe.uuid, ingredient, quantity)
      .then((addedIngredient) => ingredientsList.append(addedIngredient))
      .catch(() => console.log('Oh no, something went wrong'));
  };

  const renderCell = React.useCallback((ingredient: Ingredient, columnKey: React.Key) => {
    const onDeleteIngredient = (ingredientUuid: string) => {
      if (!recipe) return;

      removeIngredientFromRecipe(recipe.uuid, ingredientUuid)
        .then(() => ingredientsList.remove(ingredientUuid))
        .catch(() => console.log('Oh no, something went wrong'));
    }

    switch (columnKey) {
      case 'name':
        return <>{ingredient.name}</>;
      case 'quantity':
        return <>{ingredient.quantity} {ingredient.unit}</>
      case 'actions':
        return <DeleteButton onDelete={() => onDeleteIngredient(ingredient.uuid)} />;
      default:
        return <></>;
    }
  }, [ingredientsList, recipe]);

  return (
    <main className='flex m-3 justify-center'>
      <div className='flex gap-4 w-5/6'>
        <div className="w-1/3">
          {recipe && <RecipeItem recipe={recipe} />}
        </div>
        <Card className='flex w-2/3'>
          <CardHeader className="flex gap-2">
            <p>Ingredients</p>
            {recipe && <RecipeIngredientModal
                onPress={onAddIngredient}
                availableIngredients={allIngredients
                  .filter((a) => ingredientsList
                    .items.findIndex((b) => b.uuid === a.uuid) === -1)}
            />}
          </CardHeader>
          <Divider />
          <CardBody className="p-0"> {recipe &&
            <Table fullWidth={false}>
              <TableHeader>
                <TableColumn key='name' width={COLUMN_SIZE * 2}>Name</TableColumn>
                <TableColumn key='quantity' width={COLUMN_SIZE * 2}>Quantity</TableColumn>
                <TableColumn key='actions' width={COLUMN_SIZE}>Actions</TableColumn>
              </TableHeader>
              <TableBody items={ingredientsList.items}>
                {(item) => (
                  <TableRow key={item.name}>
                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                  </TableRow>
                )}
              </TableBody>
            </Table>}
          </CardBody>
        </Card>
      </div>
    </main>
  )
}
