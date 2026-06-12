import { Metadata } from "next"
import { ContactSection } from "@/components/sections/contact"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Jeet Shah for freelance projects, full-time roles, or collaborations.",
}

export default function ContactPage() {
  return (
    <div className="pt-16">
      <ContactSection />
    </div>
  )
}
