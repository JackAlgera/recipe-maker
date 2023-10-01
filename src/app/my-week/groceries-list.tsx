import { AsyncListData } from 'react-stately';
import { Ingredient, PlannedRecipe } from '../../../_components/models/models';
import React from 'react';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';

export interface GroceriesListProps {
  ingredients: Ingredient[];
}

const COLUMN_SIZE = 200;

export const GroceriesList = (props: GroceriesListProps) => {
  const renderCell = React.useCallback((ingredient: Ingredient, columnKey: React.Key) => {
    switch (columnKey) {
      case 'name':
        return <>{ingredient.name}</>;
      case 'quantity':
        return <>{ingredient.quantity} {ingredient.unit}</>;
      case 'actions':
        return (
          <div className="flex">
            {/*<IngredientModal*/}
            {/*  action={ActionType.UPDATE}*/}
            {/*  initName={ingredient.name}*/}
            {/*  onPress={(name: string) => onUpdate({ ...ingredient, name: name })} />*/}
            {/*<DeleteButton onDelete={() => onDelete(ingredient.uuid)} />*/}
          </div>
        );
      default:
        return <></>;
    }
  }, []);

  return (
    <main>
      <div className='flex justify-center'>
        <div className='flex w-8/12 flex-col'>
          <div className='flex items-center'>
            <p className='m-4 text-2xl'>Recipes</p>
            {/*{user && <IngredientModal action={ActionType.CREATE} onPress={onCreate} />}*/}
          </div>
          <Table
            // onSortChange={props.ingredients.sort}
            // sortDescriptor={props.recipes.sortDescriptor}
            aria-label='Table ingredients'
            fullWidth={false}>
            <TableHeader>
              <TableColumn key='name' allowsSorting width={COLUMN_SIZE * 2}>Name</TableColumn>
              <TableColumn key='quantity' allowsSorting width={COLUMN_SIZE}>Times</TableColumn>
              <TableColumn key='actions' width={COLUMN_SIZE}>Actions</TableColumn>
            </TableHeader>
            <TableBody items={props.ingredients}>
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
  );
}
