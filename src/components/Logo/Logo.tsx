import React from 'react';
import clsx from 'clsx';
import type { Logo as LogoType } from '@/payload-types';

interface LogoProps {
  logo: LogoType; // Pass the logo data directly
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: 'auto' | 'high' | 'low';
}

export const Logo: React.FC<LogoProps> = ({ logo, className, loading = 'lazy', priority = 'low' }) => {
  if (!logo || !logo.image || typeof logo.image === 'number' || !logo.image.url) {
    return <div className={clsx('text-red-500', className)}>Gulvrensning.dk</div>;
  }

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt={logo.alt || 'Logo'}
      width={193}
      height={34}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[9.375rem] w-full h-[34px]', className)}
      src={logo.image.url}
    />
  );
};