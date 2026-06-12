import { cacheLife, cacheTag } from "next/cache"

import { prisma } from "@/lib/prisma"

export function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export async function getPublishedArticles() {
  "use cache"
  cacheTag("articles")
  cacheLife("hours")

  return prisma.article.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      publishedAt: true,
    },
  })
}

export async function getArticleBySlug(slug: string) {
  "use cache"
  cacheTag("articles", `article-${slug}`)
  cacheLife("hours")

  return prisma.article.findFirst({
    where: { slug, published: true },
  })
}

export async function getArticleById(id: string) {
  "use cache"
  cacheTag("articles", `article-id-${id}`)
  cacheLife("minutes")

  return prisma.article.findUnique({
    where: { id },
  })
}

export async function getUniqueSlug(title: string, excludeId?: string) {
  const base = slugify(title) || "article"
  let slug = base
  let counter = 1

  while (true) {
    const existing = await prisma.article.findFirst({
      where: {
        slug,
        ...(excludeId ? { NOT: { id: excludeId } } : {}),
      },
      select: { id: true },
    })

    if (!existing) return slug

    slug = `${base}-${counter}`
    counter += 1
  }
}
