import { Resend } from "resend"

export const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendLeadNotification({
  name,
  email,
  subject,
  message,
}: {
  name: string
  email: string
  subject?: string
  message: string
}) {
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: process.env.RESEND_TO_EMAIL!,
    subject: `New lead from ${name}: ${subject ?? "Portfolio Contact"}`,
    html: `
      <h2>New contact from your portfolio</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject ?? "—"}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br/>")}</p>
    `,
  })
}
