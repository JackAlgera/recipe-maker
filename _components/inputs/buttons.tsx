import { IconContext } from 'react-icons';
import { TbTrashXFilled } from 'react-icons/tb';
import { AiTwotoneEdit } from 'react-icons/ai';
import { Button } from '@nextui-org/button';
import { BsClipboard2PlusFill } from 'react-icons/bs';
import { Tooltip } from '@nextui-org/react';

const BUTTON_SIZE = '1em';

export const CreateButton = (props: { onCreate: () => void }) => {
  return (
    <Tooltip content="Create">
      <Button aria-label='Create button' size="sm" isIconOnly onPress={props.onCreate}>
        <IconContext.Provider value={{ size: BUTTON_SIZE }}>
          <div>
            <BsClipboard2PlusFill />
          </div>
        </IconContext.Provider>
      </Button>
    </Tooltip>
  );
}

export const EditButton = (props: { onEdit: () => void }) => {
  return (
    <Tooltip content="Edit">
      <Button aria-label='Edit button' size="sm" isIconOnly color="warning" onClick={props.onEdit}>
        <IconContext.Provider value={{ size: BUTTON_SIZE }}>
          <div>
            <AiTwotoneEdit />
          </div>
        </IconContext.Provider>
      </Button>
    </Tooltip>
  );
}

export const DeleteButton = (props: { onDelete: () => void }) => {
  return (
    <Tooltip color="danger" content="Delete">
      <Button aria-label='Delete button' size="sm" isIconOnly color="danger" onClick={props.onDelete}>
        <IconContext.Provider value={{ size: BUTTON_SIZE }}>
          <div>
            <TbTrashXFilled />
          </div>
        </IconContext.Provider>
      </Button>
    </Tooltip>
  );
}
