import type { ReactNode } from 'react'

export type TagMeta = {
  label: string
  icon: ReactNode
}

const defaultTagIcon = (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
    <path
      d="M7 7h7.5a2 2 0 0 1 1.4.58l2.52 2.52a2 2 0 0 1 0 2.82l-5.08 5.08a2 2 0 0 1-2.83 0L4.98 12.4a2 2 0 0 1 0-2.82L7 7Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <circle cx="14" cy="10" r="1.2" fill="currentColor" />
  </svg>
)

export const tagMapping: Record<string, TagMeta> = {
  'c++11': {
    label: 'C++11',
    icon: <span className="text-[11px] font-black leading-none">C++</span>,
  },
  rust: {
    label: 'Rust',
    icon: <span className="text-[11px] font-black leading-none">Rs</span>,
  },
  python: {
    label: 'Python',
    icon: <span className="text-[11px] font-black leading-none">Py</span>,
  },
  'tch-rs': {
    label: 'tch-rs',
    icon: <span className="text-[11px] font-black leading-none">TR</span>,
  },
  transformers: {
    label: 'Transformers',
    icon: <span className="text-[11px] font-black leading-none">Tf</span>,
  },
  llama: {
    label: 'Llama',
    icon: <span className="text-[11px] font-black leading-none">L</span>,
  },
  filesystem: {
    label: 'Filesystem',
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
        <path
          d="M3.75 7.5h6l1.5 2.25h9v6.75a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M3.75 9V6.75a1.5 1.5 0 0 1 1.5-1.5h3.98L10.73 7.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  csv: {
    label: 'CSV',
    icon: <span className="text-[11px] font-black leading-none">CSV</span>,
  },
  'disk-usage': {
    label: 'Disk Usage',
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
        <path
          d="M5.25 6.75h13.5v10.5H5.25z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M8.25 15.75a3.75 3.75 0 1 1 7.5 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="m12 12 2.25-2.25"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  micromark: {
    label: 'micromark',
    icon: <span className="text-[11px] font-black leading-none">m</span>,
  },
  markdown: {
    label: 'Markdown',
    icon: <span className="text-[11px] font-black leading-none">MD</span>,
  },
  obsidian: {
    label: 'Obsidian',
    icon: <span className="text-[11px] font-black leading-none">Ob</span>,
  },
  plugin: {
    label: 'Plugin',
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
        <path
          d="M12 3.75v6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M8.25 6.75a2.25 2.25 0 1 1 4.5 0v3h1.5v-3a2.25 2.25 0 1 1 4.5 0c0 1.35-1.05 2.18-2.25 2.25v3.75a2.25 2.25 0 0 1-4.5 0V9.75h-1.5v3.75a2.25 2.25 0 0 1-4.5 0V9c-1.2-.07-2.25-.9-2.25-2.25a2.25 2.25 0 1 1 4.5 0Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  mit: {
    label: 'MIT',
    icon: <span className="text-[11px] font-black leading-none">MIT</span>,
  },
  homepage: {
    label: 'Homepage',
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
        <path
          d="m4.5 10.5 7.5-6 7.5 6v8.25a.75.75 0 0 1-.75.75h-4.5v-5.25h-4.5v5.25h-4.5a.75.75 0 0 1-.75-.75Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  launch: {
    label: 'Launch',
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
        <path
          d="M14.25 4.5c2.2.2 4.05 2.05 4.25 4.25-.52 4.7-3.78 7.98-8.48 8.5l-1.52-1.52c.52-4.7 3.8-7.96 8.5-8.48Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M9.75 14.25 6 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  identity: {
    label: 'Identity',
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
        <circle
          cx="12"
          cy="8.25"
          r="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M6.75 18a5.25 5.25 0 0 1 10.5 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  roadmap: {
    label: 'Roadmap',
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
        <path
          d="M5.25 18.75V5.25h9l4.5 4.5v9h-13.5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M14.25 5.25v4.5h4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  content: {
    label: 'Content',
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
        <path
          d="M6 6.75h12M6 12h12M6 17.25h7.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  iteration: {
    label: 'Iteration',
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
        <path
          d="M18 8.25A6.75 6.75 0 0 0 6.92 6.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M6.75 3.75v3.75h3.75"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 15.75a6.75 6.75 0 0 0 11.08 2.05"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M17.25 20.25V16.5H13.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
}

export function getTagMeta(tag: string): TagMeta {
  return tagMapping[tag] ?? { label: tag, icon: defaultTagIcon }
}
