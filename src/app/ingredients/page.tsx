'use client';

import { createIngredient, deleteIngredient, fetchAllIngredients, updateIngredient } from '../../../_services/supabase';
import { useEffect, useState } from 'react';
import { IngredientDao } from '../../../_components/models/models';
import { useUser } from '@auth0/nextjs-auth0/client';
import { ActionType, IngredientModal } from '../../../_components/modals/ingredient-modal';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { DeleteButton } from '../../../_components/buttons';

const COLUMN_SIZE = 200;

export default function Page() {
  const [ingredients, setIngredients] = useState<IngredientDao[]>([]);
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    fetchAllIngredients().then((ingredients: IngredientDao[]) => setIngredients(ingredients));
  }, []);

  const onDelete = (ingredientUuid: string) => {
    deleteIngredient(ingredientUuid)
      .then(() => {
        setIngredients([...ingredients.filter((i) => i.uuid !== ingredientUuid)]);
      })
      .catch(() => console.log('Oh no, something went wrong'));
  }

  const onCreate = (name: string) => {
    createIngredient(name)
      .then((ingredient: IngredientDao) => setIngredients([...ingredients, ingredient]));
  }

  const onUpdate = (ingredient: IngredientDao) => {
    updateIngredient(ingredient)
      .then((ingredient: IngredientDao) => {
        const newIngredients = [...ingredients];
        const index = newIngredients.findIndex((ingre) => ingre.uuid === ingredient.uuid);
        newIngredients[index] = ingredient;
        setIngredients(newIngredients);
      });
  }

  return (
    <main>
      <div className='flex justify-center'>
        <div className='flex w-8/12 flex-col'>
          <div className='flex items-center'>
            <p className='m-4 text-2xl'>Ingredients</p>
            {user && <IngredientModal action={ActionType.CREATE} onPress={onCreate} />}
          </div>
          <Table isStriped fullWidth={false}>
            <TableHeader>
              <TableColumn width={COLUMN_SIZE}>#</TableColumn>
              <TableColumn width={COLUMN_SIZE * 2}>Name</TableColumn>
              <TableColumn width={COLUMN_SIZE}>Actions</TableColumn>
            </TableHeader>
            <TableBody>
              {ingredients.sort((a, b) => a.name.localeCompare(b.name)).map((ingredient, index) =>
                <TableRow key={index}>
                  <TableCell>{index}</TableCell>
                  <TableCell>{ingredient.name}</TableCell>
                  <TableCell>
                    <div className="flex gap-1.5">
                      <IngredientModal
                        action={ActionType.UPDATE}
                        initName={ingredient.name}
                        onPress={(name: string) => onUpdate({ ...ingredient, name: name })} />
                      <DeleteButton onDelete={() => onDelete(ingredient.uuid)} />
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  )
}
