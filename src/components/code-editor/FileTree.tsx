import { Folder, File, ChevronRight, ChevronDown } from 'lucide-react'
import { useState, memo } from 'react'
import { useEditorStore } from '@/stores/editorStore'

interface FileNode {
  name: string
  path: string
  type: 'file' | 'folder'
  children?: FileNode[]
}

const mockFileTree: FileNode[] = [
  {
    name: 'src',
    path: '/src',
    type: 'folder',
    children: [
      { name: 'App.tsx', path: '/src/App.tsx', type: 'file' },
      { name: 'main.tsx', path: '/src/main.tsx', type: 'file' },
      {
        name: 'components',
        path: '/src/components',
        type: 'folder',
        children: [
          { name: 'Button.tsx', path: '/src/components/Button.tsx', type: 'file' },
        ],
      },
    ],
  },
  { name: 'package.json', path: '/package.json', type: 'file' },
  { name: 'README.md', path: '/README.md', type: 'file' },
]

const TreeNode = memo(({ node }: { node: FileNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { openFile } = useEditorStore()

  const handleClick = () => {
    if (node.type === 'folder') {
      setIsOpen(!isOpen)
    } else {
      openFile(node.path)
    }
  }

  return (
    <div>
      <div
        className="flex items-center space-x-2 px-2 py-1 hover:bg-accent cursor-pointer rounded"
        onClick={handleClick}
      >
        {node.type === 'folder' && (
          isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
        )}
        {node.type === 'folder' ? (
          <Folder className="w-4 h-4 text-blue-500" />
        ) : (
          <File className="w-4 h-4 text-gray-500" />
        )}
        <span className="text-sm">{node.name}</span>
      </div>
      {node.type === 'folder' && isOpen && node.children && (
        <div className="ml-4">
          {node.children.map((child) => (
            <TreeNode key={child.path} node={child} />
          ))}
        </div>
      )}
    </div>
  )
})

export const FileTree = memo(() => {
  return (
    <div className="w-64 border-r border-border bg-card p-2 overflow-auto">
      <h3 className="text-sm font-semibold mb-2 px-2">Explorer</h3>
      {mockFileTree.map((node) => (
        <TreeNode key={node.path} node={node} />
      ))}
    </div>
  )
})
