import { ModalFooter } from '@nextui-org/modal';
import { Button } from '@nextui-org/button';

export interface GenericModalFooterProps {
  createLabel?: string;
  onSubmit: (onClose: () => void) => void;
  onClose: () => void;
}

export const GenericModalFooter = (props: GenericModalFooterProps) => {
  return (
    <ModalFooter>
      <Button aria-label='accept button' color="primary" type="button" onClick={() => props.onSubmit(props.onClose)}>
        {props.createLabel ?? 'Create'}
      </Button>
      <Button aria-label='cancel button' color="danger" variant="flat" onPress={props.onClose}>
        Cancel
      </Button>
    </ModalFooter>
  );
}

