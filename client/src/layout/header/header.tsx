import { FC } from 'react';
import Link from 'next/link';

import { routes } from '@/src/constants';

import styles from './Header.module.scss';

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href={routes.home}>NextEvents</Link>
      </div>
      <nav className={styles.navigation}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link href={routes.chat}>Chat</Link>
          </li>
          <li className={styles.item}>
            <Link href={routes.events}>All Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
