import { RecipeDao } from '../../../_components/models/models';
import { useRouter } from 'next/navigation';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { DeleteButton, EditButton } from '../../../_components/icons';

export interface RecipeItemProps {
  recipe: RecipeDao;
  onDelete: () => void;
}

export const RecipeItem = (props: RecipeItemProps) => {
  const router = useRouter();

  return (
    <Card>
      <CardHeader className="justify-between">
        <div>{props.recipe.name}</div>
        <div className="flex gap-1.5">
          <EditButton onEdit={() => router.push(`/recipes/${props.recipe.uuid}`)}/>
          <DeleteButton onDelete={props.onDelete} />
        </div>
      </CardHeader>
      <CardBody>
        {props.recipe.description}
      </CardBody>
      <CardFooter>
        Created on {new Date(props.recipe.created_at).toDateString()}
      </CardFooter>
    </Card>
  );
}
