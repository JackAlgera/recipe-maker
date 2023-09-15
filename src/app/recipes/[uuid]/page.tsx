'use client';

import { useEffect, useState } from 'react';
import { IngredientDao, Recipe } from '../../../../_components/models/models';
import {
  addIngredientToRecipe,
  fetchAllIngredients,
  fetchRecipeWithIngredients,
  removeIngredientFromRecipe
} from '../../../../_services/supabase';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { DeleteButton } from '../../../../_components/buttons';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { RecipeIngredientModal } from '../../../../_components/modals/recipe-ingredient-modal';

const COLUMN_SIZE = 200;

export default function Page({ params }: { params: { uuid: string }}) {
  const [recipe, setRecipe] = useState<Recipe>();
  const [allIngredients, setAllIngredients] = useState<IngredientDao[]>([]);

  useEffect(() => {
    fetchRecipeWithIngredients(params.uuid).then((recipe: Recipe) => {
      setRecipe(recipe);
    });
  }, [params.uuid]);

  useEffect(() => {
    fetchAllIngredients().then((ingredients) => setAllIngredients(ingredients));
  }, []);

  const onDeleteIngredient = (ingredientUuid: string) => {
    if (!recipe) return;

    console.log('trying to delete recipe ', recipe.recipe.uuid, 'ingredien ', ingredientUuid);
    removeIngredientFromRecipe(recipe.recipe.uuid, ingredientUuid)
      .then(() => setRecipe({
          ...recipe,
          ingredients: [...recipe.ingredients.filter(i => i.uuid !== ingredientUuid)]
        }))
      .catch(() => console.log('Oh no, something went wrong'));
  }

  const onAddIngredient = (ingredient: IngredientDao, quantity: number, unit: string) => {
    if (!recipe) return;

    addIngredientToRecipe(recipe.recipe.uuid, ingredient, quantity, unit)
      .then((ingredient) => setRecipe({
          ...recipe,
          ingredients: [...recipe.ingredients, ingredient]
        }))
      .catch(() => console.log('Oh no, something went wrong'));
  };

  console.log('yop', recipe?.ingredients);

  return (
    <main className='flex gap-2 m-3'>
      <Card className='flex w-1/4'>
        {recipe &&
          <>
            <CardHeader className="justify-between">
              <div>{recipe.recipe.name}</div>
                <div className="flex gap-1.5">
                    {/*<CreateButton onDelete={props.onDelete} />*/}
                </div>
            </CardHeader>
            <CardBody>
              {recipe.recipe.description}
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
          {recipe &&
            <RecipeIngredientModal
              onPress={onAddIngredient}
              availableIngredients={allIngredients
                .filter((a) =>
                  recipe.ingredients.findIndex((b) => b.uuid === a.uuid) === -1)}
            />
          }
        </CardHeader>
        <CardBody> {recipe &&
          <Table fullWidth={false}>
            <TableHeader>
              <TableColumn width={COLUMN_SIZE}>#</TableColumn>
              <TableColumn width={COLUMN_SIZE * 2}>Name</TableColumn>
              <TableColumn width={COLUMN_SIZE * 2}>Quantity</TableColumn>
              <TableColumn width={COLUMN_SIZE}>Actions</TableColumn>
            </TableHeader>
            <TableBody>
              {recipe.ingredients.sort((a, b) => a.name.localeCompare(b.name)).map((ingredient, index) =>
                <TableRow key={index}>
                  <TableCell>{index}</TableCell>
                  <TableCell>{ingredient.name}</TableCell>
                  <TableCell>{ingredient.quantity} {ingredient.unit}</TableCell>
                  <TableCell>
                    <DeleteButton onDelete={() => onDeleteIngredient(ingredient.uuid)} />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>}
        </CardBody>
      </Card>
    </main>
  )
}
