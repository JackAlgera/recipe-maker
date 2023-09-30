import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/modal';
import { Select, SelectItem } from '@nextui-org/react';
import { useState } from 'react';
import { CreateButton } from '../inputs/buttons';
import { IngredientDao } from '../models/models';
import { GenericModalFooter } from './generic-modal-footer';
import { CustomInput } from '../inputs/inputs';

export interface RecipeIngredientModalProps {
  initName?: string;
  onPress: (ingredient: IngredientDao, quantity: number) => void;
  availableIngredients: IngredientDao[];
}

export const RecipeIngredientModal = (props: RecipeIngredientModalProps) => {
  const [ingredientUuid, setIngredientUuid] = useState<string>('');
  const [quantity, setQuantity] = useState('');

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onSubmit = (onClose: () => void) => {
    if (ingredientUuid && quantity) {
      props.onPress(
        props.availableIngredients
          .find((ingredient) => ingredient.uuid === ingredientUuid)!,
        parseInt(quantity)
      );
      onClose();
      setIngredientUuid('');
      setQuantity('');
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
                  label="Ingredient"
                  variant="bordered"
                  fullWidth
                  placeholder="Select an ingredient"
                  value={ingredientUuid}
                  onChange={(event) => setIngredientUuid(event.target.value)}
                >
                  {props.availableIngredients.map((ingredient) =>
                    <SelectItem aria-label={`Select ${ingredient.name}`} key={ingredient.uuid} value={ingredient.uuid}>
                      {ingredient.name}
                    </SelectItem>)}
                </Select>
                <CustomInput
                  label='Quantity'
                  value={quantity}
                  type='number'
                  onChange={(event) => setQuantity(event.target.value)} />
              </ModalBody>
              <GenericModalFooter createLabel='Add' onSubmit={onSubmit} onClose={onClose} />
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
