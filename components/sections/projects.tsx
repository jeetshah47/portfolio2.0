"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { GithubIcon } from "@/components/icons"
import { projects } from "@/lib/projects"

const categoryLabel: Record<string, string> = {
  professional: "Work",
  client: "Client",
  personal: "Personal",
}

export function ProjectsSection() {
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-28 px-6 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] rounded-full bg-primary/3 blur-[120px]" />
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
          <span className="text-xs font-mono text-primary tracking-widest uppercase">04 / Projects</span>
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">What I&apos;ve Built</h2>
          <p className="text-muted-foreground">Production systems, client work, and personal experiments.</p>
        </motion.div>

        {/* Featured — large cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {featured.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link href={`/projects/${project.slug}`} className="group block h-full">
                <div className="h-full p-6 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/3 transition-all">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full border border-border text-muted-foreground">
                      {categoryLabel[project.category]}
                    </span>
                    <ArrowUpRight size={15} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-base mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-5 line-clamp-2 leading-relaxed">
                    {project.tagline}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-mono">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-mono">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Other projects — compact */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {rest.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link href={`/projects/${project.slug}`} className="group block h-full">
                <div className="h-full p-4 rounded-xl border border-border bg-card/50 hover:border-primary/30 hover:bg-primary/3 transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-medium group-hover:text-primary transition-colors">{project.title}</h3>
                    <div className="flex gap-1.5 shrink-0 ml-2">
                      {project.liveUrl && <ArrowUpRight size={13} className="text-muted-foreground group-hover:text-primary transition-colors" />}
                      {project.githubUrl && <GithubIcon size={13} className="text-muted-foreground group-hover:text-primary transition-colors" />}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{project.tagline}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
          >
            View all projects <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  )
}
