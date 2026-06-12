import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"

import { RecentArticles } from "@/components/articles-list"
import { ArticleListFallback } from "@/components/loading-fallbacks"

export const metadata: Metadata = {
  title: "Bytepute",
  description: "Coding articles from open source developers.",
}

export default function Page() {
  return (
    <div>
      <section className="space-y-4">
        <h1 className="text-2xl font-medium tracking-tight">Bytepute</h1>
        <p className="max-w-prose text-sm leading-7 text-muted-foreground">
          We build open source software and write about what we learn along the
          way.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Recent articles</h2>
          <Link
            href="/articles"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            View all
          </Link>
        </div>

        <Suspense fallback={<ArticleListFallback />}>
          <RecentArticles />
        </Suspense>
      </section>
    </div>
  )
}
