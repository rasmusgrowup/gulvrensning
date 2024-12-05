import React from 'react';
import { TextColumn } from './Columns/TextColumn';
import { ImageColumn } from './Columns/ImageColumn';
import { VideoColumn } from './Columns/VideoColumn';
import { CardColumn } from './Columns/CardColumn';
import styles from '@/blocks/Content/Content.module.scss'

interface ContentBlockProps {
  title: string;
  columns: Array<{
    blockType: string;
    heading?: string;
    richText?: any;
    image?: { url: string; alt: string };
    videoUrl?: string;
    customComponent?: string;
  }>;
}

const columnComponents: Record<string, React.FC<any>> = {
  text: TextColumn,
  image: ImageColumn,
  video: VideoColumn,
  card: CardColumn,
};

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const {columns, title} = props;
  return (
    <div className={styles.contentContainer}>
      {title && <header className={styles.contentHeader}>{title}</header>}
      <div className={styles.columnContainer}>
        {columns.map((column, index) => {
          const ColumnComponent = columnComponents[column.blockType];
          return ColumnComponent ? <ColumnComponent key={index} {...column} /> : null;
        })}
      </div>
    </div>
  )
}