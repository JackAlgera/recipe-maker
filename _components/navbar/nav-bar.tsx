'use client';

import { LinkButton } from './link-button';
import styles from './nav-bar.module.scss';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const NavBar = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  if (error) return <div>{error.message}</div>

  return (
    <div className={styles.container}>
      <LinkButton name={'Home'} path={'/'} />
      <LinkButton name={'Recipes'} path={'/recipes'} />
      <LinkButton name={'Ingredients'} path={'/ingredients'} />
      <a href="/api/auth/login">Login</a>
      <a href="/api/auth/logout">Logout</a>
      {!isLoading && user &&
        <div className={styles.imageContainer} onClick={() => router.push('/profile')}>
            (user && user.picture ? <Image src={user.picture!} fill objectFit={'contain'} alt={user.name!} />)
        </div>
      }
    </div>
  );
}
