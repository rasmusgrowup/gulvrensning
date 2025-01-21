'use client'

import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

import styles from '../Heros.module.scss'
import { clsx } from 'clsx'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  console.log(links)
  return (
    <section className={styles.highImpactHero}>
      <div className={styles.content}>
        <div className={styles.contentInner}>
          {richText && <RichText className={styles.richText} content={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className={styles.links}>
              {links.map(({ link }, i) => {
                return (
                  <li key={i} className={styles.link}>
                    <CMSLink {...link} appearance={link.appearance || 'inline'} className={clsx(link.appearance === 'outline' && styles.outlineButton)} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className={styles.mediaContainer}>
        {media && typeof media === 'object' && (
          <Media
            fill
            imgClassName={styles.media}
            priority={false}
            loading="lazy"
            resource={media}
          />
        )}
      </div>
    </section>
  )
}
