"use server"

import { db } from "@/lib/db"
import { LeadStatus } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

async function requireAdmin() {
  const session = await auth()
  if (!session) redirect("/admin/login")
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  await requireAdmin()
  await db.lead.update({ where: { id }, data: { status } })
  revalidatePath("/admin/leads")
}

export async function updateLeadNotes(id: string, notes: string) {
  await requireAdmin()
  await db.lead.update({ where: { id }, data: { notes } })
  revalidatePath(`/admin/leads/${id}`)
}

export async function deleteLead(id: string) {
  await requireAdmin()
  await db.lead.delete({ where: { id } })
  revalidatePath("/admin/leads")
  redirect("/admin/leads")
}
