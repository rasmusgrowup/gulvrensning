import { cn } from 'src/utilities/cn'
import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'
import styles from './Blocks.module.scss'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/ContentBlock'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { clsx } from 'clsx'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][];
  hasHero?: boolean;
}> = (props) => {
  const { blocks, hasHero } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index, hashHero) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <section className={clsx(styles.blocksContainer, styles[blockType], (!hasHero && index == 0) && styles.withoutHero)} key={index}>
                  {/* @ts-expect-error */}
                  <Block {...block} />
                </section>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
