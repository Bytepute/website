import type { Metadata } from "next"
import { Suspense } from "react"

import { EditArticlePanel } from "@/components/edit-article-panel"
import { AdminPanelFallback } from "@/components/loading-fallbacks"
import { getArticleById } from "@/lib/articles"

type PageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const article = await getArticleById(id)

  return {
    title: article ? `Edit ${article.title} | Bytepute` : "Edit article | Bytepute",
    robots: { index: false, follow: false },
  }
}

export default function EditArticlePage({ params }: PageProps) {
  return (
    <Suspense fallback={<AdminPanelFallback />}>
      <EditArticlePanel params={params} />
    </Suspense>
  )
}
