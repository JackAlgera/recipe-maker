import { Button } from '@nextui-org/button';
import { IconContext } from 'react-icons';
import { BsClipboard2PlusFill } from 'react-icons/bs';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import { Checkbox, Input } from '@nextui-org/react';
import { LockFilledIcon, MailIcon } from '@nextui-org/shared-icons';
import { useState } from 'react';
import { CreateButton, EditButton } from '../buttons';

export enum ActionType {
  CREATE = 'Create',
  UPDATE = 'Update'
}

export interface IngredientModalProps {
  initName?: string;
  action: ActionType;
  onPress: (name: string) => void;
}

export const IngredientModal = (props: IngredientModalProps) => {
  const [name, setName] = useState(props.initName ?? '');

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onSubmit = (onClose: () => void) => {
    if (name) {
      props.onPress(name);
      onClose();
      switch (props.action) {
        case ActionType.CREATE:
          setName('');
          break;
        case ActionType.UPDATE:
          setName(name);
          break;
      }
    }
  }

  const title = () => {
    switch (props.action) {
      case ActionType.CREATE:
        return 'New Ingredient';
      case ActionType.UPDATE:
        return 'Update Ingredient';
    }
  }

  const actionButton = () => {
    switch (props.action) {
      case ActionType.CREATE:
        return <CreateButton onCreate={onOpen} />
      case ActionType.UPDATE:
        return <EditButton onEdit={onOpen} />
    }
  }

  return (
    <>
      {actionButton()}
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form>
              <ModalHeader className="flex flex-col gap-1">{title()}</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Name"
                  placeholder="Choose ingredient name"
                  variant="bordered"
                  isRequired
                  value={name}
                  isClearable
                  onChange={(event) => setName(event.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" type="button" onClick={() => onSubmit(onClose)}>
                  {props.action}
                </Button>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
