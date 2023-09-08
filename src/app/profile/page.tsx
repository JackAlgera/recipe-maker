'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import styles from './page.module.scss';
import Image from 'next/image';

export default function Page() {
  const { user, error, isLoading } = useUser();

  return (
    <div className={styles.container}>
      {user && (
        <div className={styles.profileContainer}>
          <div className={styles.imageContainer}>
            <Image src={user.picture!} fill objectFit={'contain'} alt={user.name!} />
          </div>
          <p>{user.name}</p>
          <p>{user.nickname}</p>
        </div>
      )}
    </div>
  );
}
