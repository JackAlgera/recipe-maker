import { Button } from '@nextui-org/button';
import { IconContext } from 'react-icons';
import { BsClipboard2PlusFill } from 'react-icons/bs';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import { Checkbox, Input } from '@nextui-org/react';
import { LockFilledIcon, MailIcon } from '@nextui-org/shared-icons';
import { useState } from 'react';

export interface RecipeModalProps {
  onCreate: (string, string, string) => void;
}

export const RecipeModal = (props: RecipeModalProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onSubmit = (onClose) => {
    if (name && description) {
      props.onCreate(name, description);
      onClose();
      setName('');
      setDescription('');
    }
  }

  return (
    <>
      <Button isIconOnly onPress={onOpen}>
        <IconContext.Provider value={{ size: '1.5em' }}>
          <div>
            <BsClipboard2PlusFill />
          </div>
        </IconContext.Provider>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form>
              <ModalHeader className="flex flex-col gap-1">New Recipe</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Recipe"
                  placeholder="Choose recipe name"
                  variant="bordered"
                  isRequired
                  value={name}
                  isClearable
                  onChange={(event) => setName(event.target.value)}
                />
                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Description"
                  placeholder="Description"
                  variant="bordered"
                  isRequired
                  isClearable
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" type="button" onClick={() => onSubmit(onClose)}>
                  Create
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
