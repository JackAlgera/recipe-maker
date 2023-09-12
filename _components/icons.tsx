import { IconContext } from 'react-icons';
import { TbTrashXFilled } from 'react-icons/tb';
import { AiTwotoneEdit } from 'react-icons/ai';
import { Button } from '@nextui-org/button';

export interface EditButtonProps {
  onEdit: () => void;
}

export const EditButton = (props: EditButtonProps) => {
  return (
    <Button isIconOnly color="warning" onClick={props.onEdit}>
      <IconContext.Provider value={{ size: '1.5em' }}>
        <div>
          <AiTwotoneEdit />
        </div>
      </IconContext.Provider>
    </Button>
  );
}

export interface DeleteButtonProps {
  onDelete: () => void;
}

export const DeleteButton = (props: DeleteButtonProps) => {
  return (
    <Button isIconOnly color="danger" onClick={props.onDelete}>
      <IconContext.Provider value={{ size: '1.5em' }}>
        <div>
          <TbTrashXFilled />
        </div>
      </IconContext.Provider>
    </Button>
  );
}
