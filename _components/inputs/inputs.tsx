import { Input, Spinner } from '@nextui-org/react';
import React, { ChangeEvent, useState } from 'react';

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

export interface ClickableInputProps {
  initValue: number;
  onChange: (value: number) => Promise<void>;
}

export const ClickableInput = (props: ClickableInputProps) => {
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState(props.initValue);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    if (props.initValue === value) return;
    setIsLoading(true);
    props.onChange(value)
      .then(() => setIsLoading(false));
  }

  const onFocusChange = (isFocused: boolean) => {
    if (!isFocused) {
      setFocused(false);
      onSubmit();
    }
  }

  const onKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setFocused(false);
      onSubmit();
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  if (!focused) {
    return <div onClick={() => setFocused(true)}>{props.initValue}</div>
  }

  return (
    <Input type='number'
           autoFocus={true}
           value={'' + value}
           onChange={(event) => setValue(Number.parseInt(event.target.value))}
           onFocusChange={onFocusChange}
           onKeyUp={onKeyUp}
    />
  );
}
