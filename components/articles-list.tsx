import Link from "next/link"

import { getPublishedArticles } from "@/lib/articles"

function formatDate(date: Date | null) {
  if (!date) return ""
  return new Intl.DateTimeFormat("en", {
    month: "short",
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

export async function RecentArticles() {
  const articles = await getPublishedArticles()
  const recent = articles.slice(0, 5)

  if (recent.length === 0) {
    return <p className="text-sm text-muted-foreground">No articles yet.</p>
  }

  return (
    <ul className="space-y-4">
      {recent.map((article) => (
        <li key={article.id} className="space-y-1">
          <Link
            href={`/articles/${article.slug}`}
            className="font-medium hover:underline"
          >
            {article.title}
          </Link>
          {article.excerpt ? (
            <p className="text-sm text-muted-foreground">{article.excerpt}</p>
          ) : null}
          <p className="text-xs text-muted-foreground">
            {formatArticleMeta(article.authorName, article.publishedAt)}
          </p>
        </li>
      ))}
    </ul>
  )
}

export async function ArticlesList() {
  const articles = await getPublishedArticles()

  if (articles.length === 0) {
    return <p className="text-sm text-muted-foreground">No articles yet.</p>
  }

  return (
    <ul className="space-y-6">
      {articles.map((article) => (
        <li
          key={article.id}
          className="space-y-1 border-b border-border pb-6 last:border-0"
        >
          <Link
            href={`/articles/${article.slug}`}
            className="text-lg font-medium hover:underline"
          >
            {article.title}
          </Link>
          {article.excerpt ? (
            <p className="text-sm text-muted-foreground">{article.excerpt}</p>
          ) : null}
          <p className="text-xs text-muted-foreground">
            {formatArticleMeta(article.authorName, article.publishedAt)}
          </p>
        </li>
      ))}
    </ul>
  )
}
