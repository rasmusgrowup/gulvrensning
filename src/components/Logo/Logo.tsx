import React from 'react';
import clsx from 'clsx';
import type { Media } from '@/payload-types';
import styles from './Logo.module.scss';
import { draftMode } from 'next/headers'

interface LogoProps {
  logo: number | Media; // Fully populated Media object
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ logo, className }) => {

  if (!logo || typeof logo === 'number' || !logo.url) {
    return <div className={clsx(styles.noLogo, className)}>Gulvrensning.dk</div>;
  }

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt={logo.alt || 'Logo'}
      src={logo.url}
      className={clsx(styles.logo, className)}
    />
  );
};