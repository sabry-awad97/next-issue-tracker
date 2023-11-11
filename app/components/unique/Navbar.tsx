'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';
import NavbarLink from './NavbarLink';

const Navbar = () => {
  const currentPath = usePathname();

  const navLinks = [
    { href: '/', text: 'Dashboard' },
    { href: '/issues', text: 'Issues' },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
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
    </nav>
  );
};

export default Navbar;
