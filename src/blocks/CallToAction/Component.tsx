import React from 'react'
import styles from './CTA.module.scss';

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        {richText && <RichText className={styles.richText} content={richText} enableGutter={false} />}
        <div className={styles.links}>
          {(links || []).map(({ link }, i) => {
            return <CMSLink className={styles.button} key={i} size="lg" {...link} />
          })}
        </div>
      </div>
    </div>
  )
}
