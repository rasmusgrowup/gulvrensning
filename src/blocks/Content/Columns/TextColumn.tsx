// components/Columns/TextColumn.tsx
import React from 'react';
import RichText from '@/components/RichText';
import { CMSLink } from '@/components/Link';
import styles from '@/blocks/Content/Columns/Columns.module.scss'
import clsx from 'clsx';

interface TextColumnProps {
  changeLayout?: boolean;
  heading?: string;
  richText?: any;
  enableLink?: boolean;
  link?: any;
  size?: string | null;
}

export const TextColumn: React.FC<TextColumnProps> = (props) => {
  const { changeLayout, heading, richText, enableLink, link, size, } = props

  const colsSpanClasses = {
    full: styles.fullColumn,
    half: styles.halfColumn,
    oneQuarter: styles.oneQuarter,
    oneSixth: styles.oneSixth,
    oneThird: styles.oneThirdColumn,
    twoThirds: styles.twoThirdsColumn,
  }

  return (
  <div className={clsx(colsSpanClasses[size!], styles.textColumn, changeLayout && styles.changeLayout)}>
    {heading && <h2 className={styles.columnHeading}>{heading}</h2>}
    <div className={styles.columnContent}>
      {richText && <RichText className={styles.richText} content={richText} enableGutter={false} />}
      <div className="vsl"></div>
      {enableLink && link && <CMSLink {...link} appearance={link.appearance || 'inline'} />}
    </div>
  </div>
  )
}