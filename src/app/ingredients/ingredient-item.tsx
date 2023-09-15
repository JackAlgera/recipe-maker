import { IngredientDao } from '../../../_components/models/models';
import { DeleteButton } from '../../../_components/buttons';
import { TableCell, TableRow } from '@nextui-org/react';

export interface IngredientItemProps {
  index: number;
  ingredient: IngredientDao;
  onDelete: () => void;
}

export const IngredientItem = (props: IngredientItemProps) => {
  return (
    <TableRow key={props.index}>
      <TableCell>{props.index}</TableCell>
      <TableCell>{props.ingredient.name}</TableCell>
      <TableCell>Hello</TableCell>
    </TableRow>
  );
}
