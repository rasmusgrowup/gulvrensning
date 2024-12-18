'use client';

import { useHeaderTheme } from '@/providers/HeaderTheme';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

import type { Header } from '@/payload-types';

import { Logo } from '@/components/Logo/Logo';
import { HeaderNav } from './Nav';
import styles from './Header.module.scss'
import { CMSLink } from '@/components/Link'
import { clsx } from 'clsx'

interface HeaderClientProps {
  header: Header;
  hasHero?: boolean | undefined;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header, hasHero }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const pathname = usePathname();
  /* State for the menu: set hideMenu to true to hide the menu */
  const [hideMenu, setHideMenu] = React.useState(true);

  return (
    <header className={clsx(styles.header, !hasHero && styles.withoutHero)}>
      <div className={styles.headerContainer}>
        <Link href="/" className={styles.logoLink}>
          <Logo logo={header.logo} className={styles.logo} />
        </Link>
        <HeaderNav header={header} hideMenu={hideMenu} hasHero={hasHero}/>
        <div className={styles.menuToggle} onClick={() => setHideMenu(!hideMenu)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
};