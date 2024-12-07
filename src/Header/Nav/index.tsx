'use client';

import React from 'react';

import type { Header as HeaderType } from '@/payload-types';

import { CMSLink } from '@/components/Link';
import Link from 'next/link';
import { SearchIcon } from 'lucide-react';

import clsx from 'clsx';
import styles from './Nav.module.scss'; // Import SCSS module

interface HeaderNavProps {
  header: HeaderType; // Define the header prop type
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ header }) => {
  const navItems = header?.navItems || [];
  const enableSearch = header?.search || false;

  return (
    <nav className={styles.nav}>
      {navItems.map(({ link }, i) => (
        <CMSLink key={i} {...link} className={styles.navItem} appearance="link" />
      ))}
      {enableSearch &&
        <Link href="/search" className={styles.searchLink}>
          <span className="sr-only">Search</span>
          <SearchIcon className={clsx(styles.searchIcon)} />
        </Link>
      }
    </nav>
  );
};