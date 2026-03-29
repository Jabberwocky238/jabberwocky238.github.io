import type { ReactNode } from 'react'
import type { IconType } from 'react-icons'
import {
  LuFileSpreadsheet,
  LuFolder,
  LuGauge,
  LuHouse,
  LuPlug,
  LuRefreshCw,
  LuRocket,
  LuTags,
  LuUserRound,
} from 'react-icons/lu'
import {
  SiCplusplus,
  SiHuggingface,
  SiMarkdown,
  SiObsidian,
  SiOpenai,
  SiPytorch,
  SiPython,
  SiRust,
} from 'react-icons/si'

export type TagMeta = {
  label: string
  icon: ReactNode
}

const iconClassName = 'h-3.5 w-3.5'

function renderIcon(Icon: IconType) {
  return <Icon className={iconClassName} aria-hidden="true" />
}

const defaultTagIcon = renderIcon(LuTags)

export const tagMapping: Record<string, TagMeta> = {
  'c++11': {
    label: 'C++11',
    icon: renderIcon(SiCplusplus),
  },
  rust: {
    label: 'Rust',
    icon: renderIcon(SiRust),
  },
  python: {
    label: 'Python',
    icon: renderIcon(SiPython),
  },
  'tch-rs': {
    label: 'tch-rs',
    icon: renderIcon(SiPytorch),
  },
  transformers: {
    label: 'Transformers',
    icon: renderIcon(SiHuggingface),
  },
  llama: {
    label: 'Llama',
    icon: renderIcon(SiOpenai),
  },
  filesystem: {
    label: 'Filesystem',
    icon: renderIcon(LuFolder),
  },
  csv: {
    label: 'CSV',
    icon: renderIcon(LuFileSpreadsheet),
  },
  'disk-usage': {
    label: 'Disk Usage',
    icon: renderIcon(LuGauge),
  },
  micromark: {
    label: 'micromark',
    icon: renderIcon(SiMarkdown),
  },
  markdown: {
    label: 'Markdown',
    icon: renderIcon(SiMarkdown),
  },
  obsidian: {
    label: 'Obsidian',
    icon: renderIcon(SiObsidian),
  },
  plugin: {
    label: 'Plugin',
    icon: renderIcon(LuPlug),
  },
  mit: {
    label: 'MIT',
    icon: renderIcon(LuTags),
  },
  homepage: {
    label: 'Homepage',
    icon: renderIcon(LuHouse),
  },
  launch: {
    label: 'Launch',
    icon: renderIcon(LuRocket),
  },
  identity: {
    label: 'Identity',
    icon: renderIcon(LuUserRound),
  },
  roadmap: {
    label: 'Roadmap',
    icon: renderIcon(LuTags),
  },
  content: {
    label: 'Content',
    icon: renderIcon(LuTags),
  },
  iteration: {
    label: 'Iteration',
    icon: renderIcon(LuRefreshCw),
  },
}

export function getTagMeta(tag: string): TagMeta {
  return tagMapping[tag] ?? { label: tag, icon: defaultTagIcon }
}
