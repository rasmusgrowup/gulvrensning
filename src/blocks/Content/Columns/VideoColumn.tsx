// components/Columns/ImageColumn.tsx
import React from 'react'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import styles from '@/blocks/Content/Columns/Columns.module.scss'
import clsx from 'clsx'

interface ImageColumnProps {
  heading?: string;
  richText?: any;
  enableLink?: boolean;
  link?: any;
  size?: string | null;
  videoUrl?: string | null;
}

export const VideoColumn: React.FC<ImageColumnProps> = (props) => {
  const { heading,
    richText,
    enableLink,
    link,
    size ,
    videoUrl
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
    <div className={clsx(colsSpanClasses[size!], styles.videoColumn)}>
      {videoUrl && (
        <iframe
          width="560"
          height="315"
          src={videoUrl}
          frameBorder="0"
          allowFullScreen
          title={heading || 'Video'}
        ></iframe>
      )}
      {heading && <h2 className={styles.columnHeading}>{heading}</h2>}
      <div className={styles.columnContent}>
        {richText && <RichText content={richText} enableGutter={false} />}
        <div className="vsl"></div>
        {enableLink && link && <CMSLink {...link} appearance={link.appearance || 'inline'} />}
      </div>
    </div>
  )
}