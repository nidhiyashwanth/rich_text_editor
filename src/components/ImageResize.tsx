import React from 'react'
import TipTapImage from '@tiptap/extension-image'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { ResizableImageTemplate } from './ResizableImageTemplate'


export const ImageResize = TipTapImage.extend({
    addAttributes() {
      return {
        ...this.parent?.(),
        width: {
          default: 640,
          renderHTML: ({ width }) => ({ width })
        },
        height: {
          default: 'auto',
          renderHTML: ({ height }) => ({ height })
        },
        align: {
          default: 'mx-auto'
        }
      }
    },
    addNodeView() {
      return ReactNodeViewRenderer(ResizableImageTemplate)
    }
  }).configure({ inline: false })