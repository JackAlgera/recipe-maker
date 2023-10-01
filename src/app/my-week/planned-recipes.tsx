import { PlannedRecipe, RecipeDao } from '../../../_components/models/models';
import React from 'react';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { AsyncListData } from 'react-stately';
import { DeleteButton } from '../../../_components/inputs/buttons';
import { ClickableInput } from '../../../_components/inputs/inputs';
import { PlannedRecipeModal } from '../../../_components/modals/planned-recipe-modal';

export interface PlannedRecipesProps {
  recipes: AsyncListData<PlannedRecipe>;
  availableRecipes: RecipeDao[];
  onDeleteRecipe: (recipeUuid: string) => void;
  onUpdateRecipe: (recipeUuid: string, times: number) => Promise<void>;
  onCreateRecipe: (recipeUuid: string, times: number) => void;
}

const COLUMN_SIZE = 200;

export const PlannedRecipes = (props: PlannedRecipesProps) => {
  const renderCell = React.useCallback((recipe: PlannedRecipe, columnKey: React.Key) => {
    switch (columnKey) {
      case 'name':
        return <>{recipe.name}</>;
      case 'times':
        return <ClickableInput
          initValue={recipe.times}
          onChange={(value: number) => props.onUpdateRecipe(recipe.uuid, value)}
        />;
      case 'actions':
        return (
          <div className="flex">
            <DeleteButton onDelete={() => props.onDeleteRecipe(recipe.uuid)} />
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
            <PlannedRecipeModal
              availableRecipes={props.availableRecipes}
              onPress={props.onCreateRecipe} />
          </div>
          <Table
            onSortChange={props.recipes.sort}
            sortDescriptor={props.recipes.sortDescriptor}
            aria-label='Table ingredients'
            fullWidth={false}>
            <TableHeader>
              <TableColumn key='name' allowsSorting width={COLUMN_SIZE * 2}>Name</TableColumn>
              <TableColumn key='times' allowsSorting width={COLUMN_SIZE}>Times</TableColumn>
              <TableColumn key='actions' width={COLUMN_SIZE}>Actions</TableColumn>
            </TableHeader>
            <TableBody items={props.recipes.items}>
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
