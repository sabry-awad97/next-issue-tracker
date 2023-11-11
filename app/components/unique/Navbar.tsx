import Link from 'next/link';
import { AiFillBug } from 'react-icons/ai';

const Navbar = () => {
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
          <li
            key={link.href}
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
          >
            <Link href={link.href}>{link.text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
