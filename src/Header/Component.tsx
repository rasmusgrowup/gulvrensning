import React from 'react';
import { getCachedGlobal } from '@/utilities/getGlobals';
import { HeaderClient } from './Component.client';
import type { Header, Logo as LogoType } from '@/payload-types';

export async function Header() {
  const header: Header = await getCachedGlobal('header', 1)();
  const logo: LogoType = await getCachedGlobal('logo', 1)() as LogoType; // Fetch logo here

  return <HeaderClient header={header} logo={logo} />;
}