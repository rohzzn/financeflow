import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/ui/mode-toggle"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/stocks", label: "Stocks" },
  { href: "/crypto", label: "Crypto" },
  { href: "/watchlist", label: "Watchlist" },
  { href: "/news", label: "News" },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center h-16 px-4">
        <Link href="/" className="flex items-center gap-2 mr-8">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
            FinanceFlow
          </span>
        </Link>
        <nav className="flex items-center flex-1 space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative text-sm font-medium transition-colors hover:text-foreground/80",
                pathname === item.href
                  ? "text-foreground after:absolute after:-bottom-[21px] after:left-0 after:h-[2px] after:w-full after:bg-blue-600 dark:after:bg-blue-400"
                  : "text-foreground/60"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-end space-x-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}