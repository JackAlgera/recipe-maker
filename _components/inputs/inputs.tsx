import { Input } from '@nextui-org/react';
import { ChangeEvent } from 'react';

export interface CustomInputProps {
  label: string;
  placeholder?: string;
  value: any;
  autoFocus?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: 'number' | 'text';
}

export const CustomInput = (props: CustomInputProps) => {
  return (
    <Input
      aria-label={`${props.label} input`}
      autoFocus={props.autoFocus ?? false}
      label={props.label}
      placeholder={props.placeholder ?? ''}
      variant="bordered"
      isRequired
      value={props.value}
      type={props.type ?? 'text'}
      onChange={props.onChange}>
    </Input>
  );
}
