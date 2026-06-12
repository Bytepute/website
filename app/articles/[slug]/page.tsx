import type { Metadata } from "next"
import { Suspense } from "react"

import { ArticleDetail } from "@/components/article-detail"
import { ArticleDetailFallback } from "@/components/loading-fallbacks"
import { getArticleBySlug } from "@/lib/articles"

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    return { title: "Article not found | Bytepute" }
  }

  return {
    title: `${article.title} | Bytepute`,
    description: article.excerpt ?? undefined,
  }
}

export default function ArticlePage({ params }: PageProps) {
  return (
    <Suspense fallback={<ArticleDetailFallback />}>
      <ArticleDetail params={params} />
    </Suspense>
  )
}
