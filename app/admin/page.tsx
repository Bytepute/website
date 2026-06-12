import type { Metadata } from "next"
import { Suspense } from "react"

import { AdminGate } from "@/components/admin-gate"
import { AdminPanelFallback } from "@/components/loading-fallbacks"

export const metadata: Metadata = {
  title: "Admin | Bytepute",
  robots: { index: false, follow: false },
}

export default function AdminPage() {
  return (
    <Suspense fallback={<AdminPanelFallback />}>
      <AdminGate />
    </Suspense>
  )
}
