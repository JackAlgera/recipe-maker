'use client';

import { LinkButton } from './link-button';
import styles from './nav-bar.module.scss';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Spinner, User } from '@nextui-org/react';
import Link from 'next/link';
import { Button } from '@nextui-org/button';

export const NavigationBar = () => {
  const { user, error, isLoading } = useUser();

  const displayUserProfile = () => {
    if (isLoading) {
      return <Spinner />;
    }

    if (user) {
      return <User
        name={user.name}
        description={user.email}
        avatarProps={{
          src: user.picture
        }}
      />
    }

    return (
      <Button as={Link} color="primary" href='/api/auth/login' variant="flat">
        Sign In
      </Button>
    );
  }

  return (
    <Navbar>
      <NavbarBrand>
        <Button as={Link} href={'/'}>Home</Button>
      </NavbarBrand>
      <NavbarContent className="sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="/recipes">
            Recipes
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href='/ingredients'>
            Ingredients
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {displayUserProfile()}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}


// <div className={styles.container}>
//   <LinkButton name={'Home'} path={'/'} />
//   <LinkButton name={'Recipes'} path={'/recipes'} />
//   <LinkButton name={'Ingredients'} path={'/ingredients'} />
//   <a href="/api/auth/login">Login</a>
//   <a href="/api/auth/logout">Logout</a>
//   {!isLoading && user &&
//       <div className={styles.imageContainer} onClick={() => router.push('/profile')}>
//           (user && user.picture ? <Image src={user.picture!} fill objectFit={'contain'} alt={user.name!} />)
//       </div>
//   }
// </div>
