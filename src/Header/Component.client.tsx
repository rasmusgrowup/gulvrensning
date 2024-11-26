'use client';

import { useHeaderTheme } from '@/providers/HeaderTheme';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import type { Header, Logo as LogoType } from '@/payload-types';

import { Logo } from '@/components/Logo/Logo';
import { HeaderNav } from './Nav';

interface HeaderClientProps {
  header: Header;
  logo: LogoType; // Include logo data
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header, logo }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null);
  const { headerTheme, setHeaderTheme } = useHeaderTheme();
  const pathname = usePathname();

  useEffect(() => {
    setHeaderTheme(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme]);

  return (
    <header className="container relative z-20" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-8 border-b border-border flex justify-between">
        <Link href="/">
          <Logo logo={logo} loading="eager" priority="high" className="invert dark:invert-0" />
        </Link>
        <HeaderNav header={header} />
      </div>
    </header>
  );
};