"use client"

import { useActionState } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { useEffect } from "react"
import { submitContact } from "@/actions/contact"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MapPin, Send } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/icons"
import { CalButton } from "@/components/cal-button"
import Link from "next/link"

const initialState: { success: boolean; error?: string } = { success: false }

const links = [
  { icon: Mail, label: "Email", value: "jeetshahajwa@gmail.com", href: "mailto:jeetshahajwa@gmail.com" },
  { icon: LinkedinIcon, label: "LinkedIn", value: "linkedin.com/in/jeetworks4", href: "https://www.linkedin.com/in/jeetworks4/" },
  { icon: GithubIcon, label: "GitHub", value: "github.com/jeetshah47", href: "https://github.com/jeetshah47" },
  { icon: MapPin, label: "Location", value: "Vadodara, Gujarat, India", href: null },
]

export function ContactSection() {
  const [state, action, pending] = useActionState(submitContact, initialState)

  useEffect(() => {
    if (state.success) toast.success("Message sent! I'll get back to you soon.")
    else if (state.error) toast.error(state.error)
  }, [state])

  return (
    <section id="contact" className="py-28 px-6 relative">
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
        <div className="w-[500px] h-[300px] rounded-full bg-primary/5 blur-[100px] mb-0" />
      </div>

      <div className="max-w-6xl mx-auto relative">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="text-xs font-mono text-primary tracking-widest uppercase">05 / Contact</span>
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Let&apos;s Work Together</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Open to senior engineering roles, freelance projects, and interesting
              collaborations. I typically respond within 24 hours.
            </p>

            <CalButton className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-primary/30 bg-primary/5 text-primary font-medium text-sm hover:bg-primary/10 hover:border-primary/50 transition-all mb-10" />

            <div className="space-y-4">
              {links.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4 group">
                  <div className="p-2.5 rounded-lg border border-border bg-card text-muted-foreground group-hover:border-primary/40 group-hover:text-primary transition-all">
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
                    {href ? (
                      <Link
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        className="text-sm font-medium hover:text-primary transition-colors"
                      >
                        {value}
                      </Link>
                    ) : (
                      <p className="text-sm font-medium">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="p-6 rounded-xl border border-border bg-card">
              <form action={action} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs text-muted-foreground">Name *</Label>
                    <Input id="name" name="name" placeholder="Your name" required
                      className="bg-background border-border focus:border-primary/50 transition-colors" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs text-muted-foreground">Email *</Label>
                    <Input id="email" name="email" type="email" placeholder="you@example.com" required
                      className="bg-background border-border focus:border-primary/50 transition-colors" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="subject" className="text-xs text-muted-foreground">Subject</Label>
                  <Input id="subject" name="subject" placeholder="Project idea, job opportunity…"
                    className="bg-background border-border focus:border-primary/50 transition-colors" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-xs text-muted-foreground">Message *</Label>
                  <Textarea id="message" name="message" rows={5} required
                    placeholder="Tell me about your project or opportunity…"
                    className="bg-background border-border focus:border-primary/50 transition-colors resize-none" />
                </div>

                <button
                  type="submit"
                  disabled={pending}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 hover:shadow-[0_0_20px_oklch(0.76_0.14_197/0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={14} />
                  {pending ? "Sending…" : "Send Message"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
