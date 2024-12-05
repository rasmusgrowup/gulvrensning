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
}

export const CardColumn: React.FC<ImageColumnProps> = (props) => {
  const { heading,
    richText,
    enableLink,
    link,
    size ,
    image
  } = props

  const colsSpanClasses = {
    full: styles.fullColumn,
    half: styles.halfColumn,
    oneThird: styles.oneThirdColumn,
    twoThirds: styles.twoThirdsColumn,
  }

  return (
    <div className={clsx(colsSpanClasses[size!], styles.cardColumn)}>
      <div className={styles.imageContainer}>
        {image &&
          <Image
            src={image.url}
            alt={image.alt}
            layout={'fill'}
          />}
      </div>
      {heading && <h2 className={styles.columnHeading}>{heading}</h2>}
      <div className={styles.columnContent}>
        {richText && <RichText content={richText} enableGutter={false} />}
        {/* <div className="vsl"></div> */}
        {enableLink && link && <CMSLink {...link} appearance={link.appearance || 'inline'} />}
      </div>
    </div>
  )
}