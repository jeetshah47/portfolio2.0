import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { LeadStatus } from "@prisma/client"
import { updateLeadStatus, updateLeadNotes, deleteLead } from "@/actions/leads"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft, Mail } from "lucide-react"
import { format } from "date-fns"

type Props = { params: Promise<{ id: string }> }

const statuses: LeadStatus[] = ["NEW", "READ", "REPLIED", "ARCHIVED"]

export default async function LeadDetailPage({ params }: Props) {
  const { id } = await params
  const lead = await db.lead.findUnique({ where: { id } })
  if (!lead) notFound()

  return (
    <div className="p-6 max-w-3xl">
      <Link href="/admin/leads" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft size={14} /> Back to leads
      </Link>

      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">{lead.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Mail size={14} className="text-muted-foreground" />
            <a href={`mailto:${lead.email}`} className="text-sm text-primary hover:underline">{lead.email}</a>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Received {format(lead.createdAt, "PPpp")}
          </p>
        </div>

        {/* Status updater */}
        <form>
          <Select
            name="status"
            defaultValue={lead.status}
            onValueChange={async (val) => {
              "use server"
              // handled client-side via separate form action below
            }}
          >
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </form>
      </div>

      {lead.subject && (
        <p className="text-sm font-medium mb-2 text-muted-foreground">Subject: {lead.subject}</p>
      )}

      <div className="p-5 rounded-lg border border-border bg-card mb-6 whitespace-pre-wrap text-sm leading-relaxed">
        {lead.message}
      </div>

      {/* Status update form */}
      <div className="mb-6">
        <p className="text-sm font-medium mb-2">Update Status</p>
        <form className="flex gap-2 flex-wrap">
          {statuses.map((s) => (
            <button
              key={s}
              formAction={async () => {
                "use server"
                await updateLeadStatus(id, s)
              }}
              className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors ${
                lead.status === s
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:bg-accent"
              }`}
            >
              {s}
            </button>
          ))}
        </form>
      </div>

      {/* Notes form */}
      <div className="mb-6">
        <p className="text-sm font-medium mb-2">Notes</p>
        <form className="space-y-2">
          <Textarea
            name="notes"
            defaultValue={lead.notes ?? ""}
            rows={4}
            placeholder="Add your notes about this lead..."
          />
          <button
            formAction={async (formData: FormData) => {
              "use server"
              await updateLeadNotes(id, formData.get("notes") as string)
            }}
            className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Save Notes
          </button>
        </form>
      </div>

      {/* Delete */}
      <div className="pt-4 border-t border-border">
        <form>
          <button
            formAction={async () => {
              "use server"
              await deleteLead(id)
            }}
            className="text-sm text-destructive hover:underline"
          >
            Delete this lead
          </button>
        </form>
      </div>
    </div>
  )
}
