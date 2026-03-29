import type { CSSProperties, ReactNode } from 'react'
import {
  Background,
  Handle,
  MarkerType,
  Position,
  ReactFlow,
  ReactFlowProvider,
  type Edge,
  type Node,
  type NodeProps,
  type NodeTypes,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { getTagMeta } from './tagicon'
import { timeline, type TimelineDate, type TimelineItem, type TimelinePoint } from './timelines'

type LinkItem = {
  label: string
  href: string
  value: string
  icon: ReactNode
}

type GraphBranch = {
  id: string
  label: string
  color: string
  match: (item: TimelineItem) => boolean
}

type TimelineCardData = {
  item: TimelineItem
  dateLabel: string
  branches: GraphBranch[]
}

type DotNodeData = {
  color: string
  size?: 'sm' | 'lg'
  glow?: boolean
  ring?: boolean
}

const links: LinkItem[] = [
  {
    label: 'Email',
    href: 'mailto:jabberwocky238@gmail.com',
    value: 'jabberwocky238@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path d="M3 6.75h18v10.5H3z" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="m4.5 8 7.5 6 7.5-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/jabberwocky238',
    value: 'github.com/jabberwocky238',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 .75a11.25 11.25 0 0 0-3.558 21.922c.563.104.77-.244.77-.544 0-.268-.01-.978-.016-1.92-3.132.68-3.793-1.51-3.793-1.51-.513-1.302-1.252-1.649-1.252-1.649-1.023-.699.077-.685.077-.685 1.13.079 1.725 1.16 1.725 1.16 1.005 1.72 2.637 1.223 3.278.936.102-.728.393-1.224.715-1.505-2.5-.284-5.13-1.25-5.13-5.563 0-1.229.44-2.235 1.16-3.023-.116-.284-.503-1.427.11-2.974 0 0 .947-.303 3.103 1.155a10.82 10.82 0 0 1 5.65 0c2.154-1.458 3.1-1.155 3.1-1.155.615 1.547.228 2.69.112 2.974.722.788 1.158 1.794 1.158 3.023 0 4.323-2.634 5.276-5.143 5.554.404.348.764 1.035.764 2.087 0 1.507-.014 2.723-.014 3.094 0 .303.203.653.777.542A11.25 11.25 0 0 0 12 .75Z"
        />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com/jabberwocky238',
    value: '@jabberwocky238',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          fill="currentColor"
          d="M18.9 2.25h3.45l-7.54 8.62L23.7 21.75h-6.96l-5.45-7.12-6.23 7.12H1.6l8.07-9.23L1.2 2.25h7.14l4.92 6.5 5.64-6.5Zm-1.22 17.41h1.91L7.3 4.24H5.25l12.43 15.42Z"
        />
      </svg>
    ),
  },
]

const graphBranches: GraphBranch[] = [
  {
    id: 'tju',
    label: 'TJU',
    color: '#2563eb',
    match: (item) => item.tags.includes('tju'),
  },
  {
    id: 'nyu',
    label: 'NYU',
    color: '#7c3aed',
    match: (item) => item.tags.includes('nyu'),
  },
  {
    id: 'kmera',
    label: 'K&M ERA',
    color: '#db2777',
    match: (item) => item.title.includes('K&M ERA'),
  },
  {
    id: 'combinator',
    label: 'Combinator',
    color: '#0ea5e9',
    match: (item) =>
      item.title.toLowerCase().includes('combinator') ||
      item.text.toLowerCase().includes('combinator') ||
      item.tags.includes('combinator'),
  },
]

const CARD_X = 232
const MAIN_X = 84
const BRANCH_X_START = 128
const BRANCH_X_GAP = 26
const ROW_HEIGHT = 220
const TOP_PADDING = 32

function formatPoint([year, month, day]: TimelinePoint) {
  return `${year} / ${String(month).padStart(2, '0')} / ${String(day).padStart(2, '0')}`
}

function formatTimelineDate(date: TimelineDate) {
  if (Array.isArray(date)) {
    return formatPoint(date)
  }

  return `${formatPoint(date.start)} - ${formatPoint(date.end)}`
}

function getTimelineSortValue(date: TimelineDate) {
  const point = Array.isArray(date) ? date : date.end
  const [year, month, day] = point

  return year * 10000 + month * 100 + day
}

function TimelineCardNode({ data }: NodeProps<Node<TimelineCardData>>) {
  const item = data.item

  return (
    <div className="w-[700px] rounded-[1.35rem] border border-stone-900/10 bg-white/88 p-5 shadow-[0_18px_40px_rgba(81,52,35,0.08)] backdrop-blur">
      <Handle type="target" position={Position.Left} className="!h-3 !w-3 !border-2 !border-white !bg-orange-600" />
      <Handle type="source" position={Position.Left} id="branch-in" className="!h-3 !w-3 !border-2 !border-white !bg-stone-300" />

      <p className="mb-2 font-mono text-xs uppercase tracking-[0.28em] text-stone-500">
        {data.dateLabel}
      </p>
      <div className="mb-3 flex flex-wrap gap-2">
        <span className="rounded-full bg-orange-100 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-orange-700">
          {item.kind}
        </span>
        {item.status ? (
          <span className="rounded-full bg-stone-100 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-stone-600">
            {item.status}
          </span>
        ) : null}
        {data.branches.map((branch) => (
          <span
            key={branch.id}
            className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-stone-600"
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: branch.color }} />
            {branch.label}
          </span>
        ))}
      </div>
      <h3 className="text-xl font-semibold text-stone-900">{item.title}</h3>
      <p className="mt-2 text-stone-600">{item.text}</p>
      {item.url ? (
        <p className="mt-3">
          <a
            className="text-sm text-orange-700 underline decoration-orange-300 underline-offset-4 transition hover:text-orange-800"
            href={item.url}
            target="_blank"
            rel="noreferrer"
          >
            Open Link
          </a>
        </p>
      ) : null}
      <ul className="mt-4 flex flex-wrap gap-2">
        {item.tags.map((tag) => {
          const meta = getTagMeta(tag)

          return (
            <li
              className="inline-flex items-center gap-2 rounded-full border border-stone-900/10 px-3 py-1 text-sm text-stone-700"
              key={tag}
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-stone-900/5 text-stone-700">
                {meta.icon}
              </span>
              <span>{meta.label}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function DotNode({ data }: NodeProps<Node<DotNodeData>>) {
  const sizeClass = data.size === 'lg' ? 'h-5 w-5' : 'h-3.5 w-3.5'
  const ringStyle: CSSProperties | undefined = data.ring
    ? { boxShadow: `0 0 0 5px ${data.color}22` }
    : undefined

  return (
    <div
      className={`rounded-full border-2 border-white ${sizeClass}`}
      style={{
        backgroundColor: data.color,
        ...(data.glow ? { boxShadow: `0 0 0 8px ${data.color}20` } : {}),
        ...ringStyle,
      }}
    >
      <Handle type="target" position={Position.Top} className="!opacity-0" />
      <Handle type="source" position={Position.Bottom} className="!opacity-0" />
      <Handle type="source" position={Position.Right} id="card" className="!opacity-0" />
    </div>
  )
}

const nodeTypes: NodeTypes = {
  timelineCard: TimelineCardNode,
  dot: DotNode,
}

function buildTimelineFlow(timelineItems: TimelineItem[]) {
  const branchMembership = timelineItems.map((item) =>
    graphBranches.filter((branch) => branch.match(item))
  )

  const nodes: Array<Node<TimelineCardData | DotNodeData>> = []
  const edges: Edge[] = []
  const previousBranchDots = new Map<string, string>()
  let previousMainDot: string | null = null

  timelineItems.forEach((item, index) => {
    const y = TOP_PADDING + index * ROW_HEIGHT
    const cardId = `card-${index}`
    const mainDotId = `main-${index}`
    const branches = branchMembership[index]

    nodes.push({
      id: cardId,
      type: 'timelineCard',
      position: { x: CARD_X, y },
      draggable: false,
      selectable: false,
      data: {
        item,
        dateLabel: formatTimelineDate(item.date),
        branches,
      },
    })

    nodes.push({
      id: mainDotId,
      type: 'dot',
      position: { x: MAIN_X, y: y + 18 },
      draggable: false,
      selectable: false,
      data: {
        color: '#d25c34',
        glow: index === 0,
        ring: index === timelineItems.length - 1,
        size: index === 0 ? 'lg' : 'sm',
      },
    })

    if (previousMainDot) {
      edges.push({
        id: `main-${previousMainDot}-${mainDotId}`,
        source: previousMainDot,
        target: mainDotId,
        type: 'smoothstep',
        animated: false,
        style: { stroke: '#d25c34', strokeWidth: 3 },
      })
    }

    edges.push({
      id: `main-card-${index}`,
      source: mainDotId,
      sourceHandle: 'card',
      target: cardId,
      type: 'smoothstep',
      animated: false,
      style: { stroke: '#b9b2aa', strokeWidth: 2 },
    })

    branches.forEach((branch, branchIndex) => {
      const branchDotId = `branch-${branch.id}-${index}`
      const x = BRANCH_X_START + branchIndex * BRANCH_X_GAP

      nodes.push({
        id: branchDotId,
        type: 'dot',
        position: { x, y: y + 20 },
        draggable: false,
        selectable: false,
        data: {
          color: branch.color,
          size: 'sm',
        },
      })

      const previousBranchDot = previousBranchDots.get(branch.id)
      if (previousBranchDot) {
        edges.push({
          id: `branch-${branch.id}-${previousBranchDot}-${branchDotId}`,
          source: previousBranchDot,
          target: branchDotId,
          type: 'smoothstep',
          animated: false,
          style: { stroke: branch.color, strokeWidth: 3 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: branch.color,
            width: 18,
            height: 18,
          },
        })
      }

      edges.push({
        id: `branch-card-${branch.id}-${index}`,
        source: branchDotId,
        sourceHandle: 'card',
        target: cardId,
        targetHandle: 'branch-in',
        type: 'smoothstep',
        animated: false,
        style: { stroke: branch.color, strokeWidth: 2.5, strokeDasharray: '5 5' },
      })

      previousBranchDots.set(branch.id, branchDotId)
    })

    previousMainDot = mainDotId
  })

  const flowHeight = TOP_PADDING * 2 + Math.max(timelineItems.length * ROW_HEIGHT, 560)

  return { nodes, edges, flowHeight }
}

function HomePage() {
  const timelineItems = [...timeline].sort(
    (a, b) => getTimelineSortValue(b.date) - getTimelineSortValue(a.date)
  )

  const { nodes, edges, flowHeight } = buildTimelineFlow(timelineItems)

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-4 sm:px-6 sm:py-8">
      <div className="grid gap-5">
        <section className="relative overflow-hidden rounded-[2rem] border border-stone-800/10 bg-[linear-gradient(180deg,rgba(255,250,245,0.96),rgba(255,255,255,0.92))] p-6 shadow-[0_24px_60px_rgba(81,52,35,0.08),0_8px_20px_rgba(81,52,35,0.06)] sm:p-10">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
          <p className="mb-4 font-mono text-sm uppercase tracking-[0.32em] text-orange-700">
            Jabberwocky238
          </p>

          <div className="mt-10 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <article className="rounded-[1.5rem] border border-stone-800/10 bg-white/75 p-6 backdrop-blur">
              <span className="inline-block font-mono text-xs uppercase tracking-[0.28em] text-stone-500">
                About
              </span>
              <h2 className="mt-4 font-serif text-3xl font-semibold tracking-[-0.04em] text-stone-900">
                涓汉浠嬬粛
              </h2>
              <p className="mt-4 text-stone-600">
                鎴戝叧娉ㄤ唬鐮併€佷骇鍝併€佸熀纭€璁炬柦鍜屼簰鑱旂綉涓婇偅浜涙湁鎰忔€濈殑灏忎笢瑗裤€傝繖涓珯鐐逛細鐢ㄦ渶鐩存帴鐨勬柟寮忎粙缁嶆垜鏄皝锛屼互鍙婃垜鍦ㄥ仛浠€涔堛€?
              </p>
            </article>

            <article className="rounded-[1.5rem] border border-stone-800/10 bg-[linear-gradient(135deg,rgba(210,92,52,0.12),rgba(255,255,255,0.85))] p-6">
              <span className="inline-block font-mono text-xs uppercase tracking-[0.28em] text-stone-500">
                Contact
              </span>
              <h2 className="mt-4 font-serif text-3xl font-semibold tracking-[-0.04em] text-stone-900">
                鑱旂郴鎴?
              </h2>
              <ul className="mt-6 grid gap-4">
                {links.map((link) => (
                  <li
                    key={link.label}
                    className="border-b border-stone-900/10 pb-4 last:border-b-0 last:pb-0"
                  >
                    <span className="block text-sm text-stone-500">{link.label}</span>
                    <a
                      className="mt-1 inline-flex items-center gap-2 break-all text-stone-900 transition hover:text-orange-700"
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.icon}
                      {link.value}
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="rounded-[2rem] border border-stone-800/10 bg-white/70 p-6 shadow-[0_24px_60px_rgba(81,52,35,0.08),0_8px_20px_rgba(81,52,35,0.06)] backdrop-blur sm:p-8">
          <div className="mb-8">
            <p className="mb-3 font-mono text-sm uppercase tracking-[0.32em] text-orange-700">
              Timeline
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-stone-700">
                <span className="h-2 w-2 rounded-full bg-orange-600" />
                Main
              </span>
              {graphBranches.map((branch) => (
                <span
                  key={branch.id}
                  className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-stone-700"
                >
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: branch.color }} />
                  {branch.label}
                </span>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.5rem] border border-stone-900/10 bg-[linear-gradient(180deg,rgba(255,252,249,0.96),rgba(255,255,255,0.84))]">
            <ReactFlowProvider>
              <div style={{ height: `${flowHeight}px` }}>
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  nodeTypes={nodeTypes}
                  fitView
                  fitViewOptions={{ padding: 0.08, minZoom: 0.72 }}
                  minZoom={0.55}
                  maxZoom={1.2}
                  panOnDrag={false}
                  panOnScroll={false}
                  zoomOnScroll={false}
                  zoomOnPinch={false}
                  zoomOnDoubleClick={false}
                  nodesDraggable={false}
                  nodesConnectable={false}
                  elementsSelectable={false}
                  preventScrolling={false}
                  colorMode="light"
                  className="bg-transparent"
                >
                  <Background gap={28} size={1} color="#e7ded4" />
                </ReactFlow>
              </div>
            </ReactFlowProvider>
          </div>
        </section>
      </div>
    </main>
  )
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </HashRouter>
  )
}

export default App
