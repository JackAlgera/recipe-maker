import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/modal';
import { useState } from 'react';
import { CreateButton } from '../inputs/buttons';
import { CustomInput } from '../inputs/inputs';
import { GenericModalFooter } from './generic-modal-footer';

export interface RecipeModalProps {
  onCreate: (name: string, description: string) => void;
}

export const RecipeModal = (props: RecipeModalProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onSubmit = (onClose: () => void) => {
    if (name && description) {
      props.onCreate(name, description);
      onClose();
      setName('');
      setDescription('');
    }
  }

  return (
    <>
      <CreateButton onCreate={onOpen} />
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form>
              <ModalHeader className="flex flex-col gap-1">New Recipe</ModalHeader>
              <ModalBody>
                <CustomInput
                  label={'Choose recipe name'}
                  value={name}
                  onChange={(event) => setName(event.target.value)} />
                <CustomInput
                  label='Description'
                  value={description}
                  placeholder='Description'
                  onChange={(event) => setDescription(event.target.value)} />
              </ModalBody>
              <GenericModalFooter createLabel='Create' onSubmit={onSubmit} onClose={onClose} />
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
