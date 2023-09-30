'use client';

import { createIngredient, deleteIngredient, fetchAllIngredients, updateIngredient } from '../../../_services/supabase';
import React from 'react';
import { IngredientDao, Unit } from '../../../_components/models/models';
import { useUser } from '@auth0/nextjs-auth0/client';
import { ActionType, IngredientModal } from '../../../_components/modals/ingredient-modal';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { DeleteButton } from '../../../_components/inputs/buttons';
import { useAsyncList } from 'react-stately';

const COLUMN_SIZE = 200;

export default function Page() {
  const { user, error, isLoading } = useUser();

  let list = useAsyncList<IngredientDao>({
    async load() {
      return { items: await fetchAllIngredients() };
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

  const onCreate = (name: string, unit: Unit) => {
    createIngredient(name, unit)
      .then((ingredient: IngredientDao) => list.append(ingredient));
  }

  const renderCell = React.useCallback((ingredient: IngredientDao, columnKey: React.Key) => {
    const onUpdate = (ingredient: IngredientDao) => {
      updateIngredient(ingredient)
        .then((newValue: IngredientDao) => list.update(newValue.uuid, newValue));
    }

    const onDelete = (ingredientUuid: string) => {
      deleteIngredient(ingredientUuid)
        .then(() => list.remove(ingredientUuid))
        .catch(() => console.log('Oh no, something went wrong'));
    }

    switch (columnKey) {
      case 'name':
        return <>{ingredient.name}</>;
      case 'unit':
        return <>{ingredient.unit}</>;
      case 'actions':
        return (
          <div className="flex">
            <IngredientModal
              action={ActionType.UPDATE}
              initName={ingredient.name}
              initUnit={ingredient.unit}
              onPress={(name: string, unit: Unit) => onUpdate({ ...ingredient, name: name, unit: unit })} />
            <DeleteButton onDelete={() => onDelete(ingredient.uuid)} />
          </div>
        );
      default:
        return <></>;
    }
  }, [list]);

  return (
    <main>
      <div className='flex justify-center'>
        <div className='flex w-8/12 flex-col'>
          <div className='flex items-center'>
            <p className='m-4 text-2xl'>Ingredients</p>
            {user && <IngredientModal action={ActionType.CREATE} onPress={onCreate} />}
          </div>
          <Table
            onSortChange={list.sort}
            sortDescriptor={list.sortDescriptor}
            aria-label='Table ingredients'
            fullWidth={false}>
            <TableHeader>
              <TableColumn key='name' allowsSorting width={COLUMN_SIZE * 2}>Name</TableColumn>
              <TableColumn key='unit' allowsSorting width={COLUMN_SIZE}>Unit</TableColumn>
              <TableColumn key='actions' width={COLUMN_SIZE}>Actions</TableColumn>
            </TableHeader>
            <TableBody items={list.items}>
              {(item) => (
                <TableRow key={item.name}>
                  {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  )
}
