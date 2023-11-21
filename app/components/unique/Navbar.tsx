'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';
import NavbarLink from './NavbarLink';
import { useSession } from 'next-auth/react';
import { Box, Container, Flex } from '@radix-ui/themes';

const Navbar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const navLinks = [
    { href: '/', text: 'Dashboard' },
    { href: '/issues/list', text: 'Issues' },
  ];

  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <ul className="flex space-x-6">
              {navLinks.map(link => (
                <NavbarLink
                  key={link.href}
                  href={link.href}
                  text={link.text}
                  currentPath={currentPath}
                />
              ))}
            </ul>
          </Flex>
          <Box>
            {status === 'authenticated' && (
              <Link href="/api/auth/signout">Logout</Link>
            )}
            {status === 'unauthenticated' && (
              <Link href="/api/auth/signin">Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
