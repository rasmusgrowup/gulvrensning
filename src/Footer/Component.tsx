import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer as FooterType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

import styles from './Footer.module.scss'
import RichText from '@/components/RichText'

export async function Footer() {
  const footer: FooterType = await getCachedGlobal('footer', 1)()

  const navItems = footer?.navItems || []
  const phoneNumber = footer?.phoneNumber || '';
  const email = footer?.email || '';
  const description = footer?.description || '';
  const address = footer?.address || '';

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topContent}>
          <Link href="/" className={styles.logoLink}>
            <Logo logo={footer.logo} className={styles.logo} />
          </Link>
          <div className={styles.contactInfo}>
            <CMSLink url={`mailto:${email}`}>{email}</CMSLink>
            <CMSLink url={`tel:${phoneNumber}`}>{phoneNumber}</CMSLink>
          </div>
        </div>
        <div className={styles.bottomContent}>
          <div className={styles.companyDescription}>
            {description && <p>{description}</p>}
          </div>
          {navItems &&
            <div className={styles.navigation}>
              <h3>Navigation</h3>
              <nav className={styles.nav}>
                {navItems.map(({ link }, i) => (
                  <CMSLink key={i} {...link} className={styles.navItem} appearance="link"/>
                ))}
              </nav>
            </div>
          }
          {address &&
            <div className={styles.companyAddress}>
              <h3>Company Info</h3>
              {address && <RichText content={address} enableGutter={false} />}
            </div>
          }
        </div>
        <div className={styles.legalNotice}>
          <div>© Gulvrensning ApS {new Date().getFullYear()}</div>
        </div>
      </div>
    </footer>
  )
}