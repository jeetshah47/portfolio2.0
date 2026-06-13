"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/icons"
import { CalButton } from "@/components/cal-button"

const badges = ["Go", "React", "Next.js", "Node.js", "AWS", "TypeScript"]
const aiTools = ["Cursor", "Claude", "GitHub Copilot", "OpenAI API", "v0"]

export function HeroSection() {
  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-16 overflow-hidden">

      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-primary/60 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono tracking-widest uppercase mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Available for work
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-6xl md:text-8xl font-bold tracking-tight mb-4 text-foreground"
        >
          Jeet Shah
        </motion.h1>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-2xl text-muted-foreground font-medium mb-6"
        >
          Senior Full Stack &{" "}
          <span className="text-primary">Platform Engineer</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed text-base"
        >
          I build scalable web platforms and cloud-native systems. 2.5+ years
          delivering production-ready applications from React UIs to concurrent
          Go microservices on AWS.
        </motion.p>

        {/* Tech badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-4"
        >
          {badges.map((badge) => (
            <span
              key={badge}
              className="px-3 py-1 text-xs font-mono rounded-md border border-border bg-card text-muted-foreground"
            >
              {badge}
            </span>
          ))}
        </motion.div>

        {/* AI-assisted tags */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          <span className="text-xs font-mono text-muted-foreground/50 mr-1">✦ AI-assisted</span>
          {aiTools.map((tool) => (
            <span
              key={tool}
              className="px-3 py-1 text-xs font-mono rounded-md border border-primary/20 bg-primary/5 text-primary/70"
            >
              {tool}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="#projects"
            className="px-6 py-2.5 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all hover:shadow-[0_0_20px_oklch(0.76_0.14_197/0.3)]"
          >
            View My Work
          </Link>
          <Link
            href="#contact"
            className="px-6 py-2.5 rounded-md border border-border bg-card text-foreground font-medium text-sm hover:border-primary/40 hover:bg-primary/5 transition-all"
          >
            Get In Touch
          </Link>
          <CalButton className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md border border-primary/30 bg-primary/5 text-primary font-medium text-sm hover:bg-primary/10 hover:border-primary/50 transition-all" />
          <Link
            href="https://github.com/jeetshah47"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-md border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
          >
            <GithubIcon size={17} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/jeetworks4/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-md border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
          >
            <LinkedinIcon size={17} />
          </Link>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono text-muted-foreground tracking-widest uppercase">Scroll</span>
        <Link href="#about" className="text-muted-foreground hover:text-primary transition-colors animate-bounce">
          <ArrowDown size={16} />
        </Link>
      </motion.div>
    </section>
  )
}
