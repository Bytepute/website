import { redirect } from "next/navigation"

import { LoginForm } from "@/components/article-form"
import { isAdminAuthenticated } from "@/lib/auth"

export async function AdminGate() {
  const authenticated = await isAdminAuthenticated()

  if (authenticated) {
    redirect("/admin/articles/new")
  }

  return (
    <section className="mx-auto max-w-sm space-y-4">
      <h1 className="text-xl font-medium">Admin</h1>
      <LoginForm />
    </section>
  )
}
