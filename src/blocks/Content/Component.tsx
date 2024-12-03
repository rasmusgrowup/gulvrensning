import { cn } from 'src/utilities/cn'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'

import styles from './Content.module.scss'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const {
    columns,
    title,
  } = props

  const colsSpanClasses = {
    full: styles.fullColumn,
    half: styles.halfColumn,
    oneThird: styles.oneThirdColumn,
    twoThirds: styles.twoThirdsColumn,
  }

  return (
    <div className={styles.contentContainer}>
      {title && <header className={styles.contentHeader}>{title}</header>}
      <div className={styles.columnContainer}>
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const {
              heading,
              enableLink,
              link,
              richText,
              size
            } = col

            return (
              <div className={colsSpanClasses[size!]} key={index}>
                {heading && <h2 className={styles.columnHeading}>{heading}</h2>}
                <div className={styles.columnContent}>
                  {richText && <RichText content={richText} enableGutter={false} />}
                  <div className="vsl"></div>
                  {enableLink && link && <CMSLink {...link} appearance={link.appearance || 'inline'}/>}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
