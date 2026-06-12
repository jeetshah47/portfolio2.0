"use server"

import { db } from "@/lib/db"
import { sendLeadNotification } from "@/lib/resend"
import { revalidatePath } from "next/cache"

export type ContactFormState = {
  success: boolean
  error?: string
}

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  if (!name || !email || !message) {
    return { success: false, error: "Name, email, and message are required." }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address." }
  }

  try {
    await db.lead.create({
      data: { name, email, subject: subject || null, message },
    })

    await sendLeadNotification({ name, email, subject, message })

    return { success: true }
  } catch {
    return { success: false, error: "Something went wrong. Please try again." }
  }
}
