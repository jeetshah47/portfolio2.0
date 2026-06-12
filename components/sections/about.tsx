"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { MapPin, Briefcase, GraduationCap, Download, Calendar } from "lucide-react"

const stats = [
  { value: "2.5+", label: "Years Experience" },
  { value: "10+", label: "Projects Shipped" },
  { value: "3", label: "Companies" },
  { value: "∞", label: "Coffees Consumed" },
]

const info = [
  { icon: MapPin, label: "Location", value: "Vadodara, Gujarat, India" },
  { icon: Briefcase, label: "Current Role", value: "Software Engineer @ Vayana Network" },
  { icon: GraduationCap, label: "Education", value: "B.IT — Navrachana University, 2023" },
  { icon: Calendar, label: "Experience", value: "Jan 2023 – Present" },
]

export function AboutSection() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="text-xs font-mono text-primary tracking-widest uppercase">01 / About</span>
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              An organism that converts{" "}
              <span className="text-primary">caffeine into code</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5">
              I&apos;m a self-taught Full Stack and Platform Engineer from Vadodara, India.
              With 2.5+ years of professional experience, I specialise in building
              production systems that scale — from pixel-perfect React UIs to concurrent
              Go microservices deployed on AWS.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Currently at Vayana Network, I design enterprise-grade platforms handling
              LEI lifecycle management, payment workflows, and organisation management.
              Outside of work I take on freelance projects and explore agentic AI tooling.
            </p>

            <Link
              href="/doc/Jeet_Shah_Senior_Full_Stack_ATS_Resume.pdf"
              target="_blank"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border bg-card text-sm font-medium hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all group"
            >
              <Download size={15} className="group-hover:translate-y-0.5 transition-transform" />
              Download Resume
            </Link>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mt-10 pt-8 border-t border-border">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-primary">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — info cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 gap-3"
          >
            {info.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:border-primary/30 transition-all group"
              >
                <div className="p-2.5 rounded-md bg-primary/10 text-primary shrink-0 group-hover:bg-primary/15 transition-colors">
                  <Icon size={16} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
                  <p className="text-sm font-medium">{value}</p>
                </div>
              </div>
            ))}

            {/* Availability card */}
            <div className="mt-2 p-5 rounded-lg border border-primary/20 bg-primary/5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">Available for opportunities</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Open to senior full-stack or platform engineering roles, and freelance
                projects. Based in Vadodara, open to remote work.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
