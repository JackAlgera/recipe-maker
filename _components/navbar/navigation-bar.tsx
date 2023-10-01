'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
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
          src: user.picture ?? ''
        }}
      />
    }

    return (
      <Button as={Link} color='primary' href='/api/auth/login' variant='flat'>
        Sign In
      </Button>
    );
  }

  return (
    <Navbar>
      <NavbarBrand>
        <Button as={Link} href={'/'}>Home</Button>
      </NavbarBrand>
      <NavbarContent className='sm:flex gap-4' justify='center'>
        <NavbarItem>
          <Link href='/recipes'>
            Recipes
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/ingredients'>
            Ingredients
          </Link>
        </NavbarItem>
        {user && <NavbarItem>
          <Link href='/my-week'>
            My week
          </Link>
        </NavbarItem>}
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem>
          {displayUserProfile()}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

