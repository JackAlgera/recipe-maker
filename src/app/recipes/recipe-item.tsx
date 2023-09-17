import { RecipeDao } from '../../../_components/models/models';
import { useRouter } from 'next/navigation';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { DeleteButton, EditButton } from '../../../_components/inputs/buttons';
import { Divider } from '@nextui-org/react';

export interface RecipeItemProps {
  recipe: RecipeDao;
  onDelete?: () => void;
}

export const RecipeItem = (props: RecipeItemProps) => {
  const router = useRouter();

  return (
    <Card>
      <CardHeader className="justify-between">
        <p className="text-lg font-bold">{props.recipe.name}</p>
        {props.onDelete &&
          <div className="flex">
            <EditButton onEdit={() => router.push(`/recipes/${props.recipe.uuid}`)}/>
            <DeleteButton onDelete={props.onDelete} />
          </div>
        }
      </CardHeader>
      <Divider />
      <CardBody>
        {props.recipe.description}
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-end">
        {new Date(props.recipe.created_at).toDateString()}
      </CardFooter>
    </Card>
  );
}
