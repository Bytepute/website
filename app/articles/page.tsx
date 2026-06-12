import type { Metadata } from "next"
import { Suspense } from "react"

import { ArticlesList } from "@/components/articles-list"
import { ArticleListFallback } from "@/components/loading-fallbacks"

export const metadata: Metadata = {
  title: "Articles | Bytepute",
  description: "Coding articles from open source developers.",
}

export default function ArticlesPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-medium tracking-tight">Articles</h1>

      <Suspense fallback={<ArticleListFallback />}>
        <ArticlesList />
      </Suspense>
    </section>
  )
}
