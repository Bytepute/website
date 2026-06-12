import Link from "next/link"
import { notFound } from "next/navigation"

import { ArticleContent } from "@/components/article-content"
import { getArticleBySlug } from "@/lib/articles"

function formatDate(date: Date | null) {
  if (!date) return ""
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

function formatArticleMeta(authorName: string | null, publishedAt: Date | null) {
  const parts = [
    authorName ? `By ${authorName}` : null,
    formatDate(publishedAt) || null,
  ].filter(Boolean)

  return parts.join(" · ")
}

export async function ArticleDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const meta = formatArticleMeta(article.authorName, article.publishedAt)

  return (
    <article className="space-y-6">
      <header className="space-y-2">
        <Link
          href="/articles"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Articles
        </Link>
        <h1 className="text-3xl font-medium tracking-tight">{article.title}</h1>
        {meta ? (
          <p className="text-sm text-muted-foreground">{meta}</p>
        ) : null}
        {article.excerpt ? (
          <p className="text-sm leading-7 text-muted-foreground">
            {article.excerpt}
          </p>
        ) : null}
      </header>
      <ArticleContent content={article.content} />
    </article>
  )
}
