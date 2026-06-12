import Link from "next/link"
import { notFound } from "next/navigation"
import { connection } from "next/server"

import { ArticleForm, DeleteArticleForm, LogoutForm } from "@/components/article-form"
import { getArticleById } from "@/lib/articles"

export async function EditArticlePanel({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  await connection()
  const article = await getArticleById(id)

  if (!article) {
    notFound()
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl font-medium">Edit article</h1>
        <div className="flex items-center gap-2">
          {article.published ? (
            <Link
              href={`/articles/${article.slug}`}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              View live
            </Link>
          ) : null}
          <LogoutForm />
        </div>
      </div>
      <ArticleForm mode="edit" article={article} />
      <DeleteArticleForm id={article.id} />
    </section>
  )
}
