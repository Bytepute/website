"use server"

import { updateTag } from "next/cache"
import { redirect } from "next/navigation"

import { getUniqueSlug } from "@/lib/articles"
import {
  clearAdminSession,
  createAdminSession,
  isAdminAuthenticated,
  verifyAdminPassword,
} from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export type ActionState = {
  error?: string
  success?: boolean
} | null

async function requireAdmin() {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) {
    redirect("/admin")
  }
}

function invalidateArticleCache(article: { id: string; slug: string }, previousSlug?: string) {
  updateTag("articles")
  updateTag(`article-${article.slug}`)
  updateTag(`article-id-${article.id}`)

  if (previousSlug && previousSlug !== article.slug) {
    updateTag(`article-${previousSlug}`)
  }
}

export async function loginAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const password = String(formData.get("password") ?? "")

  if (!verifyAdminPassword(password)) {
    return { error: "Invalid password" }
  }

  await createAdminSession()
  redirect("/admin/articles/new")
}

export async function logoutAction(
  _prevState: ActionState,
  _formData: FormData
): Promise<ActionState> {
  void _prevState
  void _formData
  await clearAdminSession()
  redirect("/admin")
}

export async function createArticleAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin()

  const title = String(formData.get("title") ?? "").trim()
  const authorName = String(formData.get("authorName") ?? "").trim()
  const excerpt = String(formData.get("excerpt") ?? "").trim()
  const content = String(formData.get("content") ?? "").trim()
  const published = formData.get("published") === "on"

  if (!title || !content) {
    return { error: "Title and content are required" }
  }

  const slug = await getUniqueSlug(title)

  const article = await prisma.article.create({
    data: {
      title,
      slug,
      authorName: authorName || null,
      excerpt: excerpt || null,
      content,
      published,
      publishedAt: published ? new Date() : null,
    },
  })

  invalidateArticleCache(article)
  redirect(`/admin/articles/${article.id}/edit`)
}

export async function updateArticleAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin()

  const id = String(formData.get("id") ?? "")
  const title = String(formData.get("title") ?? "").trim()
  const authorName = String(formData.get("authorName") ?? "").trim()
  const excerpt = String(formData.get("excerpt") ?? "").trim()
  const content = String(formData.get("content") ?? "").trim()
  const published = formData.get("published") === "on"

  if (!id || !title || !content) {
    return { error: "Title and content are required" }
  }

  const existing = await prisma.article.findUnique({ where: { id } })
  if (!existing) {
    return { error: "Article not found" }
  }

  const slug =
    existing.title === title ? existing.slug : await getUniqueSlug(title, id)

  const article = await prisma.article.update({
    where: { id },
    data: {
      title,
      slug,
      authorName: authorName || null,
      excerpt: excerpt || null,
      content,
      published,
      publishedAt: published
        ? (existing.publishedAt ?? new Date())
        : null,
    },
  })

  invalidateArticleCache(article, existing.slug)

  return { success: true }
}

export async function deleteArticleAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin()

  const id = String(formData.get("id") ?? "")
  const article = await prisma.article.findUnique({ where: { id } })

  if (!article) {
    return { error: "Article not found" }
  }

  await prisma.article.delete({ where: { id } })

  invalidateArticleCache(article)
  redirect("/admin/articles/new")
}
