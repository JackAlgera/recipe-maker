import { Button } from '@nextui-org/button';
import { IconContext } from 'react-icons';
import { BsClipboard2PlusFill } from 'react-icons/bs';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import { Checkbox, Input, Select, SelectItem } from '@nextui-org/react';
import { LockFilledIcon, MailIcon } from '@nextui-org/shared-icons';
import { useState } from 'react';
import { CreateButton, EditButton } from '../buttons';
import { IngredientDao } from '../models/models';

export interface RecipeIngredientModalProps {
  initName?: string;
  onPress: (ingredient: IngredientDao, quantity: number, unit: string) => void;
  availableIngredients: IngredientDao[];
}

export const RecipeIngredientModal = (props: RecipeIngredientModalProps) => {
  const [ingredientUuid, setIngredientUuid] = useState<string>('');
  const [quantity, setQuantity] = useState('0');
  const [unit, setUnit] = useState('')

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onSubmit = (onClose: () => void) => {
    console.log(ingredientUuid, quantity, unit);
    if (ingredientUuid && quantity && unit) {
      props.onPress(
        props.availableIngredients
          .find((ingredient) => ingredient.uuid === ingredientUuid)!,
        parseInt(quantity),
        unit
      );
      onClose();
      setIngredientUuid('');
      setQuantity('');
      setUnit('');
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
                <Input
                  label="Quantity"
                  variant="bordered"
                  isRequired
                  type="number"
                  value={quantity}
                  onChange={(event) => setQuantity(event.target.value)}
                  aria-label='Quantity input'
                />
                <Input
                  label="Unit"
                  variant="bordered"
                  isRequired
                  value={unit}
                  onChange={(event) => setUnit(event.target.value)}
                  aria-label='Unit input'
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" type="button" onClick={() => onSubmit(onClose)}>
                  Add
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
