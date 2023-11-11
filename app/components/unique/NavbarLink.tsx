import classNames from 'classnames';
import Link from 'next/link';

interface Props {
  href: string;
  text: string;
  currentPath: string;
}

const NavbarLink = ({ href, text, currentPath }: Props) => (
  <li
    className={classNames({
      'text-zinc-900': href === currentPath,
      'text-zinc-500': href !== currentPath,
      'hover:text-zinc-800': true,
      'transition-colors': true,
    })}
  >
    <Link href={href}>{text}</Link>
  </li>
);

export default NavbarLink;
