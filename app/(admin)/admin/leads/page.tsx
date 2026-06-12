import { db } from "@/lib/db"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

type LeadStatus = "NEW" | "READ" | "REPLIED" | "ARCHIVED"

type Lead = { id: string; name: string; email: string; subject: string | null; message: string; status: LeadStatus; notes: string | null; createdAt: Date; updatedAt: Date }

const statusColors: Record<LeadStatus, string> = {
  NEW: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  READ: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  REPLIED: "bg-green-500/10 text-green-500 border-green-500/20",
  ARCHIVED: "bg-muted text-muted-foreground border-border",
}

export default async function LeadsPage() {
  const leads = await db.lead.findMany({ orderBy: { createdAt: "desc" } }) as Lead[]

  const counts = {
    total: leads.length,
    new: leads.filter((l) => l.status === "NEW").length,
    replied: leads.filter((l) => l.status === "REPLIED").length,
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Leads</h1>
        <p className="text-sm text-muted-foreground">{counts.total} total · {counts.new} new · {counts.replied} replied</p>
      </div>

      {leads.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p>No leads yet. Share your portfolio!</p>
        </div>
      ) : (
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Email</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Subject</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Received</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/admin/leads/${lead.id}`} className="font-medium hover:text-primary transition-colors">
                      {lead.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{lead.email}</td>
                  <td className="px-4 py-3 text-muted-foreground max-w-xs truncate">{lead.subject ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded border text-xs font-medium ${statusColors[lead.status]}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">
                    {formatDistanceToNow(lead.createdAt, { addSuffix: true })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
