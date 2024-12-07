import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'

import styles from '../Heros.module.scss'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  return (
    <section className={styles.lowImpactHero}>
      <div className={styles.content}>
        <div className={styles.contentInner}>
          {children || (richText && <RichText content={richText} className={styles.richText} enableGutter={false} />)}
        </div>
      </div>
    </section>
  )
}
