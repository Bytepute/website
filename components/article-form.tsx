"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"

import {
  createArticleAction,
  deleteArticleAction,
  loginAction,
  logoutAction,
  updateArticleAction,
  type ActionState,
} from "@/app/admin/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

function SubmitButton({
  children,
  pendingLabel,
  variant,
}: {
  children: React.ReactNode
  pendingLabel?: string
  variant?: "default" | "destructive" | "outline"
}) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} variant={variant}>
      {pending ? (pendingLabel ?? children) : children}
    </Button>
  )
}

type ArticleFormProps = {
  mode: "create" | "edit"
  article?: {
    id: string
    title: string
    authorName: string | null
    excerpt: string | null
    content: string
    published: boolean
  }
}

export function ArticleForm({ mode, article }: ArticleFormProps) {
  const action = mode === "create" ? createArticleAction : updateArticleAction
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    action,
    null
  )

  return (
    <form action={formAction} className="space-y-4">
      {mode === "edit" && article ? (
        <input type="hidden" name="id" value={article.id} />
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          defaultValue={article?.title ?? ""}
          required
          disabled={pending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="authorName">Author</Label>
        <Input
          id="authorName"
          name="authorName"
          defaultValue={article?.authorName ?? ""}
          disabled={pending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          rows={2}
          defaultValue={article?.excerpt ?? ""}
          disabled={pending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content (Markdown)</Label>
        <Textarea
          id="content"
          name="content"
          rows={18}
          className="font-mono"
          defaultValue={article?.content ?? ""}
          required
          disabled={pending}
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="published"
          defaultChecked={article?.published ?? false}
          disabled={pending}
          className="size-4 rounded border border-input"
        />
        Publish
      </label>

      {state?.error ? (
        <p className="text-sm text-destructive">{state.error}</p>
      ) : null}
      {state?.success ? (
        <p className="text-sm text-muted-foreground">Saved.</p>
      ) : null}

      <SubmitButton pendingLabel={mode === "create" ? "Creating..." : "Saving..."}>
        {mode === "create" ? "Create article" : "Save changes"}
      </SubmitButton>
    </form>
  )
}

export function DeleteArticleForm({ id }: { id: string }) {
  const [state, formAction] = useActionState<ActionState, FormData>(
    deleteArticleAction,
    null
  )

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      {state?.error ? (
        <p className="mb-2 text-sm text-destructive">{state.error}</p>
      ) : null}
      <SubmitButton variant="destructive" pendingLabel="Deleting...">
        Delete
      </SubmitButton>
    </form>
  )
}

export function LoginForm() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    loginAction,
    null
  )

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          disabled={pending}
        />
      </div>

      {state?.error ? (
        <p className="text-sm text-destructive">{state.error}</p>
      ) : null}

      <SubmitButton pendingLabel="Signing in...">Sign in</SubmitButton>
    </form>
  )
}

export function LogoutForm() {
  const [, formAction] = useActionState<ActionState, FormData>(
    logoutAction,
    null
  )

  return (
    <form action={formAction}>
      <SubmitButton variant="outline" pendingLabel="Signing out...">
        Sign out
      </SubmitButton>
    </form>
  )
}
