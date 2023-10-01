import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/modal';
import { Select, SelectItem } from '@nextui-org/react';
import { useState } from 'react';
import { CreateButton } from '../inputs/buttons';
import { RecipeDao } from '../models/models';
import { GenericModalFooter } from './generic-modal-footer';
import { CustomInput } from '../inputs/inputs';

export interface PlannedRecipeModalProps {
  onPress: (recipeUuid: string, times: number) => void;
  availableRecipes: RecipeDao[];
}

export const PlannedRecipeModal = (props: PlannedRecipeModalProps) => {
  const [recipeUuid, setRecipeUuid] = useState('');
  const [times, setTimes] = useState('1');

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onSubmit = (onClose: () => void) => {
    if (recipeUuid && times) {
      props.onPress(
        recipeUuid,
        parseInt(times)
      );
      onClose();
      setRecipeUuid('');
      setTimes('1');
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
              <ModalHeader className="flex flex-col gap-1">Add ingredient</ModalHeader>
              <ModalBody>
                <Select
                  isRequired
                  label="Recipe"
                  variant="bordered"
                  fullWidth
                  placeholder="Select a recipe"
                  value={recipeUuid}
                  onChange={(event) => setRecipeUuid(event.target.value)}
                >
                  {props.availableRecipes.map((recipe) =>
                    <SelectItem aria-label={`Select ${recipe.name}`} key={recipe.uuid} value={recipe.uuid}>
                      {recipe.name}
                    </SelectItem>)}
                </Select>
                <CustomInput
                  label='Quantity'
                  value={times}
                  type='number'
                  onChange={(event) => setTimes(event.target.value)} />
              </ModalBody>
              <GenericModalFooter createLabel='Add' onSubmit={onSubmit} onClose={onClose} />
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
