export function ArticleListFallback() {
  return (
    <ul className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <li key={index} className="space-y-2">
          <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
          <div className="h-3 w-full animate-pulse rounded bg-muted" />
          <div className="h-3 w-16 animate-pulse rounded bg-muted" />
        </li>
      ))}
    </ul>
  )
}

export function ArticleDetailFallback() {
  return (
    <article className="space-y-6">
      <div className="space-y-3">
        <div className="h-3 w-20 animate-pulse rounded bg-muted" />
        <div className="h-8 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-3 w-32 animate-pulse rounded bg-muted" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="h-4 w-full animate-pulse rounded bg-muted" />
        ))}
      </div>
    </article>
  )
}

export function AdminPanelFallback() {
  return (
    <section className="space-y-4">
      <div className="h-6 w-32 animate-pulse rounded bg-muted" />
      <div className="h-9 w-full animate-pulse rounded bg-muted" />
      <div className="h-9 w-full animate-pulse rounded bg-muted" />
      <div className="h-48 w-full animate-pulse rounded bg-muted" />
    </section>
  )
}
