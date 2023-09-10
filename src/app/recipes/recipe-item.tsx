import { RecipeDao } from '../../../_components/models/models';
import { useRouter } from 'next/navigation';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { TbTrashXFilled } from 'react-icons/tb';
import { IconContext } from 'react-icons';

export interface RecipeItemProps {
  recipe: RecipeDao;
  onDelete: () => void;
}

export const RecipeItem = (props: RecipeItemProps) => {
  const router = useRouter();

  return (
    <Card>
      <CardHeader className="justify-between">
        <Button onPress={() => router.push(`/recipes/${props.recipe.uuid}`)}>
          <div>{props.recipe.name}</div>
        </Button>
        <Button isIconOnly color="danger" onClick={props.onDelete}>
          <IconContext.Provider value={{ size: '1.5em' }}>
            <div>
              <TbTrashXFilled />
            </div>
          </IconContext.Provider>
        </Button>
      </CardHeader>
      <CardBody>
        {props.recipe.description}
      </CardBody>
      <CardFooter>
        {props.recipe.created_at}
      </CardFooter>
    </Card>
  );
}
