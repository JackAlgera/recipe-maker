import Link from 'next/link';

export interface LinkButtonProps {
  name: string;
  path: string;
}

export const LinkButton = (props: LinkButtonProps) => {
  return (
    <Link href={props.path}>{props.name}</Link>
  );
}
