import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/modal';
import { useState } from 'react';
import { CreateButton, EditButton } from '../inputs/buttons';
import { GenericModalFooter } from './generic-modal-footer';
import { CustomInput } from '../inputs/inputs';
import { Select, SelectItem } from '@nextui-org/react';
import { fromUnit, toUnit, Unit, UNITS } from '../models/models';

export enum ActionType {
  CREATE = 'Create',
  UPDATE = 'Update'
}

export interface IngredientModalProps {
  initName?: string;
  initUnit?: Unit;
  action: ActionType;
  onPress: (name: string, unit: Unit) => void;
}

export const IngredientModal = (props: IngredientModalProps) => {
  const [name, setName] = useState<string>(props.initName ?? '');
  const [unit, setUnit] = useState<string>(
    props.initUnit ? fromUnit(props.initUnit) : '');

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onSubmit = (onClose: () => void) => {
    if (name) {
      props.onPress(name, toUnit(unit));
      onClose();
      switch (props.action) {
        case ActionType.CREATE:
          setName('');
          setUnit('');
          break;
        case ActionType.UPDATE:
          setName(name);
          setUnit(unit)
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
                <Select
                  isRequired
                  label="Unit"
                  variant="bordered"
                  fullWidth
                  placeholder="Select unit"
                  value={unit}
                  onChange={(event) => setUnit(event.target.value)}
                >
                  {UNITS.map((u) =>
                    <SelectItem aria-label={`Select ${u}`} key={u} value={u}>
                      {u}
                    </SelectItem>)}
                </Select>
              </ModalBody>
              <GenericModalFooter createLabel={props.action} onSubmit={onSubmit} onClose={onClose} />
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
