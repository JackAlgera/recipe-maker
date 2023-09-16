'use client';

import React, { useEffect, useState } from 'react';
import { Ingredient, IngredientDao, RecipeDao, Unit } from '../../../../_components/models/models';
import {
  addIngredientToRecipe,
  fetchAllIngredients,
  fetchRecipeWithIngredients,
  removeIngredientFromRecipe
} from '../../../../_services/supabase';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { DeleteButton } from '../../../../_components/inputs/buttons';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { RecipeIngredientModal } from '../../../../_components/modals/recipe-ingredient-modal';
import { useAsyncList } from 'react-stately';

const COLUMN_SIZE = 200;

export default function Page({ params }: { params: { uuid: string }}) {
  const [recipe, setRecipe] = useState<RecipeDao>();
  const [allIngredients, setAllIngredients] = useState<IngredientDao[]>([]);

  let ingredientsList = useAsyncList<Ingredient>({
    async load() {
        const newRecipe = await fetchRecipeWithIngredients(params.uuid);
        setRecipe(newRecipe.recipe);
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

  const onAddIngredient = (ingredient: IngredientDao, quantity: number, unit: Unit) => {
    if (!recipe) return;

    addIngredientToRecipe(recipe.uuid, ingredient, quantity, unit)
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
    <main className='flex gap-2 m-3'>
      <Card className='flex w-1/4'>
        {recipe &&
          <>
            <CardHeader className="justify-between">
              <div>{recipe.name}</div>
                <div className="flex gap-1.5">
                    {/*<CreateButton onDelete={props.onDelete} />*/}
                </div>
            </CardHeader>
            <CardBody>
              {recipe.description}
            </CardBody>
            <CardFooter>
              {/*Created on {new Date(recipe.created_at).toDateString()}*/}
            </CardFooter>
          </>
        }
      </Card>
      <Card className='flex w-3/4'>
        <CardHeader className="flex gap-2">
          <p>Ingredients</p>
          {recipe && <RecipeIngredientModal
              onPress={onAddIngredient}
              availableIngredients={allIngredients
                .filter((a) => ingredientsList
                  .items.findIndex((b) => b.uuid === a.uuid) === -1)}
          />}
        </CardHeader>
        <CardBody> {recipe &&
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
    </main>
  )
}
