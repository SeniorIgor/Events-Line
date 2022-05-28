import Link from "next/link";
import { FC } from "react";

import paths from "@/config/paths";

import styles from "./header.module.scss";

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href={paths.home}>NextEvents</Link>
      </div>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <Link href={paths.events}>All Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
