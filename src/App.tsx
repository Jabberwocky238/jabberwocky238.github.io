import type { ReactNode } from 'react'
import {
  Background,
  MarkerType,
  ReactFlow,
  ReactFlowProvider,
  type Edge,
  type Node,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { getTagMeta } from './tagicon'
import {
  graphBranches,
  timeline,
  type GraphBranchId,
  type TimelineDate,
  type TimelineItem,
  type TimelinePoint,
} from './timelines'

type LinkItem = {
  label: string
  href: string
  value: string
  icon: ReactNode
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

const MAIN_X = 20
const ROW_HEIGHT = 248
const DOT_OFFSET_Y = 117
const FLOW_WIDTH = 320

const graphBranchEntries = Object.entries(graphBranches) as [
  GraphBranchId,
  (typeof graphBranches)[GraphBranchId],
][]

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

function buildTimelineFlow(timelineItems: TimelineItem[]) {
  const branchMembership = timelineItems.map((item) =>
    (item.branches ?? []).map((branchId) => ({
      id: branchId,
      ...graphBranches[branchId],
    }))
  )

  const nodes: Node[] = []
  const edges: Edge[] = []
  const previousBranchDots = new Map<GraphBranchId, string>()
  let previousMainDot: string | null = null

  edges.push({
    id: 'main-top-stem',
    source: 'main-top-anchor',
    target: 'main-0',
    type: 'straight',
    animated: false,
    style: { stroke: '#d25c34', strokeWidth: 3 },
  })

  nodes.push({
    id: 'main-top-anchor',
    position: { x: MAIN_X, y: 0 },
    draggable: false,
    selectable: false,
    data: {},
    style: { width: 1, height: 1, opacity: 0, pointerEvents: 'none' },
  })
  graphBranchEntries.forEach(([branchId, branch]) => {
    nodes.push({
      id: `${branchId}-top-anchor`,
      position: { x: branch.topAnchorX, y: 0 },
      draggable: false,
      selectable: false,
      data: {},
      style: { width: 1, height: 1, opacity: 0, pointerEvents: 'none' },
    })
  })

  timelineItems.forEach((_, index) => {
    const branches = branchMembership[index]
    const y = index * ROW_HEIGHT
    const mainDotId = `main-${index}`

    nodes.push({
      id: mainDotId,
      position: { x: MAIN_X, y: y + DOT_OFFSET_Y },
      draggable: false,
      selectable: false,
      data: {},
      style: {
        width: index === 0 ? 18 : 14,
        height: index === 0 ? 18 : 14,
        borderRadius: 999,
        border: '2px solid white',
        background: '#d25c34',
        boxShadow:
          index === 0
            ? '0 0 0 8px rgba(210,92,52,0.15)'
            : index === timelineItems.length - 1
              ? '0 0 0 5px rgba(210,92,52,0.13)'
              : 'none',
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

    branches.forEach((branch, branchIndex) => {
      const branchDotId = `branch-${branch.id}-${index}`
      const x = branch.offset

      nodes.push({
        id: branchDotId,
        position: { x, y: y + DOT_OFFSET_Y + branchIndex * 2 },
        draggable: false,
        selectable: false,
        data: {},
        style: {
          width: 12,
          height: 12,
          borderRadius: 999,
          border: '2px solid white',
          background: branch.color,
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
      } else {
        edges.push({
          id: `branch-${branch.id}-top-stem`,
          source: `${branch.id}-top-anchor`,
          target: branchDotId,
          type: 'straight',
          animated: false,
          style: { stroke: branch.color, strokeWidth: 3 },
        })
      }

      edges.push({
        id: `branch-main-${branch.id}-${index}`,
        source: branchDotId,
        target: mainDotId,
        type: 'smoothstep',
        animated: false,
        style: { stroke: branch.color, strokeWidth: 2, strokeDasharray: '5 5', opacity: 0.9 },
      })

      previousBranchDots.set(branch.id, branchDotId)
    })

    previousMainDot = mainDotId
  })

  const flowHeight = Math.max(timelineItems.length * ROW_HEIGHT, 560)

  return { nodes, edges, flowHeight, branchMembership }
}

function HomePage() {
  const timelineItems = [...timeline].sort(
    (a, b) => getTimelineSortValue(b.date) - getTimelineSortValue(a.date)
  )

  const { nodes, edges, flowHeight, branchMembership } = buildTimelineFlow(timelineItems)

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
                个人介绍
              </h2>
              <p className="mt-4 text-stone-600">
                我关注代码、产品、基础设施和互联网上那些有意思的小东西。这个站点会用最直接的方式介绍我是谁，以及我在做什么。
              </p>
            </article>

            <article className="rounded-[1.5rem] border border-stone-800/10 bg-[linear-gradient(135deg,rgba(210,92,52,0.12),rgba(255,255,255,0.85))] p-6">
              <span className="inline-block font-mono text-xs uppercase tracking-[0.28em] text-stone-500">
                Contact
              </span>
              <h2 className="mt-4 font-serif text-3xl font-semibold tracking-[-0.04em] text-stone-900">
                联系我
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
              {graphBranchEntries.map(([branchId, branch]) => (
                <span
                  key={branchId}
                  className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-stone-700"
                >
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: branch.color }} />
                  {branch.label}
                </span>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.5rem] border border-stone-900/10 bg-[linear-gradient(180deg,rgba(255,252,249,0.96),rgba(255,255,255,0.84))]">
            <div className="grid grid-cols-[320px_minmax(0,1fr)]">
              <div className="relative border-r border-stone-900/8 bg-[radial-gradient(circle_at_top,rgba(210,92,52,0.06),transparent_18rem)]">
                <ReactFlowProvider>
                  <div style={{ height: `${flowHeight}px`, width: `${FLOW_WIDTH}px` }}>
                    <ReactFlow
                      nodes={nodes}
                      edges={edges}
                      fitView={false}
                      defaultViewport={{ x: 0, y: 0, zoom: 1 }}
                      minZoom={1}
                      maxZoom={1}
                      panOnDrag={false}
                      panOnScroll={false}
                      zoomOnScroll={false}
                      zoomOnPinch={false}
                      zoomOnDoubleClick={false}
                      nodesDraggable={false}
                      nodesConnectable={false}
                      elementsSelectable={false}
                      preventScrolling={false}
                      proOptions={{ hideAttribution: true }}
                      colorMode="light"
                      className="bg-transparent"
                    >
                      <Background gap={28} size={1} color="#e7ded4" />
                    </ReactFlow>
                  </div>
                </ReactFlowProvider>
              </div>

              <div className="divide-y divide-stone-900/6">
                {timelineItems.map((item, index) => {
                  const activeBranches = branchMembership[index]

                  return (
                    <article
                      key={`${index}-${item.title}`}
                      className="flex h-[248px] items-center overflow-hidden px-5 py-0"
                    >
                      <div className="grid h-[208px] w-full min-w-0 grid-rows-[auto_auto_1fr] overflow-hidden rounded-[1.25rem] border border-stone-900/10 bg-white/82 px-5 py-4 shadow-[0_14px_32px_rgba(81,52,35,0.06)]">
                        <div className="mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                          <h3
                            className="min-h-0 overflow-hidden text-xl leading-7 font-semibold text-stone-900"
                            style={{
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                            }}
                          >
                            {item.title}
                          </h3>
                          <p className="pt-1 text-right font-mono text-xs uppercase tracking-[0.28em] text-stone-500">
                            {formatTimelineDate(item.date)}
                          </p>
                        </div>

                        <div className="mb-3 flex max-h-[60px] flex-wrap content-start gap-2 overflow-hidden">
                          <span className="rounded-full bg-orange-100 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-orange-700">
                            {item.kind}
                          </span>
                          {item.status ? (
                            <span className="rounded-full bg-stone-100 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-stone-600">
                              {item.status}
                            </span>
                          ) : null}
                          {activeBranches.map((branch) => (
                            <span
                              key={branch.id}
                              className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-stone-600"
                            >
                              <span
                                className="h-2 w-2 rounded-full"
                                style={{ backgroundColor: branch.color }}
                              />
                              {branch.label}
                            </span>
                          ))}
                          {item.url ? (
                            <a
                              className="inline-flex items-center rounded-full bg-stone-100 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-orange-700 underline decoration-orange-300 underline-offset-4 transition hover:text-orange-800"
                              href={item.url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Link
                            </a>
                          ) : null}
                          {item.tags.slice(0, 5).map((tag) => {
                            const meta = getTagMeta(tag)

                            return (
                              <span
                                className="inline-flex items-center gap-2 rounded-full border border-stone-900/10 px-3 py-1 text-sm text-stone-700"
                                key={tag}
                              >
                                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-stone-900/5 text-stone-700">
                                  {meta.icon}
                                </span>
                                <span>{meta.label}</span>
                              </span>
                            )
                          })}
                        </div>
                        <p
                          className="min-h-0 overflow-hidden leading-6 text-stone-600"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {item.text}
                        </p>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
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
