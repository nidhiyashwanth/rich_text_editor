// @ts-nocheck
'use client'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import React from 'react'

import '@/styles/styles.scss'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import BulletList from '@tiptap/extension-bullet-list'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Image from '@tiptap/extension-image'
import { ImageResize } from './ImageResize'
const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }
  const activeHeadingLevel = [1, 2, 3, 4, 5, 6].find(level => editor.isActive('heading', { level })) || 'Headings';

  return (
    <div className="control-group py-4">
      <div className="button-group grid grid-cols-12">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={`${editor.isActive('bold') ? 'is-active bg-gray-200' : ''} bg-gray-100`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={`${editor.isActive('italic') ? 'is-active bg-gray-200' : ''} bg-gray-100`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
            className={`${editor.isActive('strike') ? 'is-active bg-gray-200' : ''} bg-gray-100`}
        >
          Strike
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleCode()
              .run()
          }
          className={`${editor.isActive('code') ? 'is-active bg-gray-200' : ''} bg-gray-100`}
        >
          Code
        </button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()} className={`${editor.isActive('unsetAllMarks') ? 'is-active bg-gray-200' : ''} bg-gray-100`}>
          Clear marks
        </button>
        <button onClick={() => editor.chain().focus().clearNodes().run()} className={`${editor.isActive('clearNodes') ? 'is-active bg-gray-200' : ''} bg-gray-100`}>
          Clear nodes
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`${editor.isActive('paragraph') ? 'is-active bg-gray-200' : ''} bg-gray-100`}
        >
          Paragraph
        </button>

{/* Wrap heading buttons inside dropdown */}
<DropdownMenu className="w-fit h-fit bg-blue-500">
          <DropdownMenuTrigger>
            <div className="cursor-pointer p-2 bg-gray-100 rounded">
              {typeof activeHeadingLevel === 'number' ? `H${activeHeadingLevel}` : activeHeadingLevel}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {[1, 2, 3, 4, 5, 6].map(level => (
              <DropdownMenuItem
                key={level}
                onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                className={`${editor.isActive('heading', { level }) ? 'is-active bg-gray-200' : ''} bg-gray-100`}
              >
                H{level}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

       {/* Dropdown for List Options */}
       <DropdownMenu className="w-fit h-fit bg-blue-500">
          <DropdownMenuTrigger>
            <div className="cursor-pointer p-2 bg-gray-100 rounded">
            {/* show lists if no list is active otherwise show the active list */}
            {editor.isActive('bulletList') ? 'Bullet list' : editor.isActive('orderedList') ? 'Ordered list' : 'List'}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => editor.chain().focus().toggleBulletList().run()}>
              Bullet list
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().toggleOrderedList().run()}>
              Ordered list
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${editor.isActive('bulletList') ? 'is-active bg-gray-200' : ''} bg-gray-100`}
        >
          Bullet list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${editor.isActive('orderedList') ? 'is-active bg-gray-200' : ''} bg-gray-100`}
        >
          Ordered list
        </button> */}
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`${editor.isActive('codeBlock') ? 'is-active bg-gray-200' : ''} bg-gray-100`}
        >
          Code block
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`${editor.isActive('blockquote') ? 'is-active bg-gray-200' : ''} bg-gray-100`}
        >
          Blockquote
        </button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className={`${editor.isActive('horizontalRule') ? 'is-active bg-gray-200' : ''} bg-gray-100`}>
          Horizontal rule
        </button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()} className={`${editor.isActive('hardBreak') ? 'is-active bg-gray-200' : ''} bg-gray-100`}>
          Hard break
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
          className={`${editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active bg-gray-200' : ''} bg-gray-100`}
        >
          Undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
          className={`${editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active bg-gray-200' : ''} bg-gray-100`}
        >
          Redo
        </button>
        <button
          onClick={() => editor.chain().focus().setColor('#958DF1').run()}
            className={`${editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active bg-gray-200' : ''} bg-gray-100`}
        >
          Purple
        </button>
        <DropdownMenu>
        <DropdownMenuTrigger>
          <div className='cursor-pointer p-2 bg-gray-100 rounded'>Table Operations</div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
            Insert table
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().addColumnBefore().run()}>Add column before</DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().addColumnAfter().run()}>Add column after</DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().deleteColumn().run()}>Delete column</DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().addRowBefore().run()}>Add row before</DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().addRowAfter().run()}>Add row after</DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().deleteRow().run()}>Delete row</DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().deleteTable().run()}>Delete table</DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().mergeCells().run()}>Merge cells</DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().splitCell().run()}>Split cell</DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeaderColumn().run()}>Toggle header column</DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeaderRow().run()}>Toggle header row</DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeaderCell().run()}>Toggle header cell</DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().mergeOrSplit().run()}>Merge or split</DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().setCellAttribute('colspan', 2).run()}>Set cell attribute</DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().fixTables().run()}>Fix tables</DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().goToNextCell().run()}>Go to next cell</DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().goToPreviousCell().run()}>Go to previous cell</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className='cursor-pointer p-2 bg-gray-100 rounded'>Image Operations</div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => editor.chain().focus().setImage({ src: 'https://placehold.co/800x400' }).run()}>Insert image</DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().setImage({ src: 'https://placehold.co/800x400/6A00F5/white' }).run()}>Insert image with custom style</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
    </div>
  )
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: 'my-custom-class',
      },
    },
  }),
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Image.configure({
    HTMLAttributes: {
      class: 'my-custom-class',
    },
    inline: true,
    allowBase64: true,
    allowResize: true,
  }),
  ImageResize,
]

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>

<p>This is a basic example of implementing images. Drag to re-order.</p>
        <img src="https://placehold.co/800x400" />
        <img src="https://placehold.co/800x400/6A00F5/white" />
<p>You can also insert images with custom styles.</p>
`

const TextEditor = () => {
    return (
      <div className="w-fit h-fit flex mx-auto flex-col focus:outline-none">
        <EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={content} immediatelyRender={false} className='editor'> </EditorProvider>
      </div>
    )
  }  

export default TextEditor