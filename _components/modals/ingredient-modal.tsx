import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/modal';
import { useState } from 'react';
import { CreateButton, EditButton } from '../inputs/buttons';
import { GenericModalFooter } from './generic-modal-footer';
import { CustomInput } from '../inputs/inputs';

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
                <CustomInput
                  label='Name'
                  placeholder='Choose ingredient name'
                  value={name}
                  onChange={(event) => setName(event.target.value)} />
              </ModalBody>
              <GenericModalFooter createLabel={props.action} onSubmit={onSubmit} onClose={onClose} />
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
