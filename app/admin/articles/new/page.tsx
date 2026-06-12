import type { Metadata } from "next"

import { ArticleForm, LogoutForm } from "@/components/article-form"

export const metadata: Metadata = {
  title: "New article | Bytepute",
  robots: { index: false, follow: false },
}

export default function NewArticlePage() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-medium">New article</h1>
        <LogoutForm />
      </div>
      <ArticleForm mode="create" />
      <p className="text-sm text-muted-foreground">
        Write in Markdown. Use fenced code blocks for syntax highlighting.
      </p>
    </section>
  )
}
