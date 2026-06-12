import Link from "next/link"
import { notFound } from "next/navigation"
import { connection } from "next/server"

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

export async function ArticleDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  await connection()
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

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
        <p className="text-sm text-muted-foreground">
          {formatDate(article.publishedAt)}
        </p>
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
