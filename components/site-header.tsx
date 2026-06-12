import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="mb-10 flex items-center justify-between border-b border-border pb-4">
      <Link href="/" className="font-medium tracking-tight">
        Bytepute
      </Link>
      <nav className="flex items-center gap-4 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <Link href="/articles" className="hover:text-foreground">
          Articles
        </Link>
      </nav>
    </header>
  )
}
