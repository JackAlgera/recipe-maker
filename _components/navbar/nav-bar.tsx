'use client';

import { HomeButton } from './home-button';
import styles from './nav-bar.module.scss';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';

export const NavBar = () => {
  const { user, error, isLoading } = useUser();

  if (error) return <div>{error.message}</div>

  const onClick = () => {
console.log(user);
  }

  return (
    <div className={styles.container}>
      <HomeButton />
      <a href="/api/auth/login">Login</a>
      <a href="/api/auth/logout">Logout</a>
        <div className={styles.imageContainer} onClick={onClick}>
          {isLoading ?
              <div>L</div> :
              (user && user.picture ? <Image src={user.picture} fill objectFit={'contain'} alt={user.name!} /> : <></>)
          }
        </div>
    </div>
  );
}
