// components/Columns/ImageColumn.tsx
import React from 'react'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import Image from 'next/image';
import styles from '@/blocks/Content/Columns/Columns.module.scss'
import clsx from 'clsx'
import { ArrowRight } from 'lucide-react';

interface ImageColumnProps {
  heading?: string;
  richText?: any;
  enableLink?: boolean;
  link?: any;
  size?: string | null;
  image?: { url: string; alt: string };
}

export const ImageColumn: React.FC<ImageColumnProps> = (props) => {
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
    oneQuarter: styles.oneQuarter,
    oneSixth: styles.oneSixth,
    oneThird: styles.oneThirdColumn,
    twoThirds: styles.twoThirdsColumn,
  }

  return (
    <div className={clsx(colsSpanClasses[size!], styles.imageColumn)}>
      <div className={styles.imageContainer}>
        {image && <Image src={image.url} alt={image.alt} layout={'fill'} objectFit="cover" />}
      </div>
      <div className={styles.contentContainer}>
        {heading && <h2 className={styles.columnHeading}>{heading}</h2>}
        <div className={styles.columnContent}>
          {richText && <RichText className={styles.richText} content={richText} enableGutter={false} />}
          {enableLink && link && <div className="vsl"></div>}
          {enableLink && link &&
            <CMSLink
              {...link}
              icon={<ArrowRight size={16} />}
              appearance={link.appearance || 'inline'} />
          }
        </div>
      </div>
    </div>
  )
}