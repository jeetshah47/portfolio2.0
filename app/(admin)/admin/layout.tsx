import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { signOut } from "@/lib/auth"
import { LayoutDashboard, Users, LogOut } from "lucide-react"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect("/admin/login")

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-56 border-r border-border bg-card flex flex-col">
        <div className="p-4 border-b border-border">
          <p className="font-mono font-bold text-sm">jeetshah<span className="text-primary">.</span>crm</p>
          <p className="text-xs text-muted-foreground mt-0.5">{session.user?.email}</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          <Link
            href="/admin/leads"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors"
          >
            <Users size={15} />
            Leads
          </Link>
        </nav>
        <div className="p-3 border-t border-border">
          <form action={async () => { "use server"; await signOut({ redirectTo: "/admin/login" }) }}>
            <button
              type="submit"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm w-full hover:bg-accent transition-colors text-muted-foreground"
            >
              <LogOut size={15} />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
