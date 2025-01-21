// components/Columns/ImageColumn.tsx
import React from 'react'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import Image from 'next/image';
import styles from '@/blocks/Content/Columns/Columns.module.scss'
import clsx from 'clsx'

interface ImageColumnProps {
  heading?: string;
  richText?: any;
  enableLink?: boolean;
  link?: any;
  size?: string | null;
  image?: { url: string; alt: string };
  overlay?: boolean | false;
}

export const CardColumn: React.FC<ImageColumnProps> = (props) => {
  const {
    heading,
    richText,
    enableLink,
    link,
    size ,
    image,
    overlay
  } = props

  const colsSpanClasses = {
    full: styles.fullColumn,
    half: styles.halfColumn,
    oneQuarter: styles.oneQuarter,
    oneSixth: styles.oneSixth,
    oneThird: styles.oneThirdColumn,
    twoThirds: styles.twoThirdsColumn,
  }

  return (
    <div className={clsx(colsSpanClasses[size!], styles.cardColumn)}>
      <div className={clsx(styles.imageContainer, overlay && styles.imageOverlay)}>
        {image &&
          <Image
            src={image.url}
            alt={image.alt}
            layout={'fill'}
          />}
      </div>
      <div className={clsx(styles.cardColumnInner)}>
        {heading && <h2 className={styles.columnHeading}>{heading}</h2>}
        <div className={styles.columnContent}>
          {richText && <RichText className={styles.richText} content={richText} enableGutter={false} />}
          {/* <div className="vsl"></div> */}
          {enableLink && link && <CMSLink {...link} appearance={link.appearance || 'default'} />}
        </div>
      </div>
    </div>
  )
}