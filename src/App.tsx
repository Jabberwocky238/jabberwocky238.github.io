import type { ReactNode } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { getTagMeta } from './tagicon'
import { timeline, type TimelineDate, type TimelinePoint } from './timelines'

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

function formatPoint([year, month, day]: TimelinePoint) {
  return `${year} / ${String(month).padStart(2, '0')} / ${String(day).padStart(2, '0')}`
}

function formatTimelineDate(date: TimelineDate) {
  if (Array.isArray(date)) {
    return formatPoint(date)
  }

  return `${formatPoint(date.start)} - ${formatPoint(date.end)}`
}

function getTimelineKey(date: TimelineDate) {
  if (Array.isArray(date)) {
    return date.join('-')
  }

  return `${date.start.join('-')}_${date.end.join('-')}`
}

function getTimelineSortValue(date: TimelineDate) {
  const point = Array.isArray(date) ? date : date.end
  const [year, month, day] = point

  return year * 10000 + month * 100 + day
}

function HomePage() {
  const timelineItems = [...timeline].sort(
    (a, b) => getTimelineSortValue(b.date) - getTimelineSortValue(a.date)
  )

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-4 sm:px-6 sm:py-8">
      <div className="grid gap-5">
        <section className="relative overflow-hidden rounded-[2rem] border border-stone-800/10 bg-[linear-gradient(180deg,rgba(255,250,245,0.96),rgba(255,255,255,0.92))] p-6 shadow-[0_24px_60px_rgba(81,52,35,0.08),0_8px_20px_rgba(81,52,35,0.06)] sm:p-10">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
          <p className="mb-4 font-mono text-sm uppercase tracking-[0.32em] text-orange-700">Jabberwocky238</p>

          <div className="mt-10 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <article className="rounded-[1.5rem] border border-stone-800/10 bg-white/75 p-6 backdrop-blur">
              <span className="inline-block font-mono text-xs uppercase tracking-[0.28em] text-stone-500">About</span>
              <h2 className="mt-4 font-serif text-3xl font-semibold tracking-[-0.04em] text-stone-900">个人介绍</h2>
              <p className="mt-4 text-stone-600">
                我关注代码、产品和互联网上那些有意思的小东西。这个站点会用最直接的方式介绍我是谁，以及我在做什么。
              </p>
            </article>

            <article className="rounded-[1.5rem] border border-stone-800/10 bg-[linear-gradient(135deg,rgba(210,92,52,0.12),rgba(255,255,255,0.85))] p-6">
              <span className="inline-block font-mono text-xs uppercase tracking-[0.28em] text-stone-500">Contact</span>
              <h2 className="mt-4 font-serif text-3xl font-semibold tracking-[-0.04em] text-stone-900">联系我</h2>
              <ul className="mt-6 grid gap-4">
                {links.map((link) => (
                  <li key={link.label} className="border-b border-stone-900/10 pb-4 last:border-b-0 last:pb-0">
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
            <p className="mb-3 font-mono text-sm uppercase tracking-[0.32em] text-orange-700">Timeline</p>
          </div>

          <div className="relative grid gap-6 pl-5 before:absolute before:bottom-1 before:left-[0.33rem] before:top-1 before:w-0.5 before:bg-[linear-gradient(180deg,#d25c34,rgba(210,92,52,0.12))] before:content-['']">
            {timelineItems.map((item) => (
              <article className="relative" key={`${getTimelineKey(item.date)}-${item.title}`}>
                <div className="absolute -left-5 top-2 h-3.5 w-3.5 rounded-full bg-orange-600 shadow-[0_0_0_6px_rgba(210,92,52,0.12)]" />
                <div className="rounded-[1.25rem] border border-stone-900/10 bg-white/80 p-5">
                  <p className="mb-2 font-mono text-xs uppercase tracking-[0.28em] text-stone-500">{formatTimelineDate(item.date)}</p>
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-orange-100 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-orange-700">
                      {item.kind}
                    </span>
                    {item.status ? (
                      <span className="rounded-full bg-stone-100 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-stone-600">
                        {item.status}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="text-xl font-semibold text-stone-900">{item.title}</h3>
                  <p className="mt-2 text-stone-600">{item.text}</p>
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
              </article>
            ))}
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
