import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer as FooterType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

import styles from './Footer.module.scss'

export async function Footer() {
  const footer: FooterType = await getCachedGlobal('footer', 1)()

  const navItems = footer?.navItems || []

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topContent}>
          <Link href="/" className={styles.logoLink}>
            <Logo logo={footer.logo} className={styles.logo} />
          </Link>
        </div>
        <div className={styles.bottomContent}>
          <div>
            {/* HERE GOES A TEXT FIELD */}
          </div>
          <div className={styles.navigation}>
            <nav className={styles.nav}>
              {navItems.map(({ link }, i) => (
                <CMSLink key={i} {...link} className={styles.navItem} />
              ))}
            </nav>
          </div>
        </div>
        <div className={styles.legalNotice}>
          <div>© Gulvrensning ApS {new Date().getFullYear()}</div>
        </div>
      </div>
    </footer>
  )
}