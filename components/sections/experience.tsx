"use client"

import { motion } from "framer-motion"

const experience = [
  {
    role: "Software Engineer",
    company: "Vayana Network",
    period: "Jan 2023 – Present",
    type: "Full-time",
    description: [
      "Designed concurrent Go services using goroutines and channels for background jobs and async workflows.",
      "Built actor-model-inspired worker systems for payment polling, LEI renewals, and scheduled tasks.",
      "Architected and deployed services on AWS: ECS, ECR, RDS, Route 53, S3, SNS.",
      "Implemented JWT + Keycloak authentication with RBAC across enterprise platforms.",
      "Improved UI engagement by 56% and data processing speed by 78% through React optimizations.",
    ],
    tags: ["Go", "React", "TypeScript", "AWS", "Keycloak", "Docker", "PostgreSQL"],
    current: true,
  },
  {
    role: "Full Stack Developer",
    company: "RoundTechSquare",
    period: "May 2022 – Aug 2022",
    type: "Full-time",
    description: [
      "Served as MERN stack developer building client-facing product features.",
      "Interacted directly with clients to gather requirements and translate into technical specs.",
    ],
    tags: ["React", "Node.js", "MongoDB", "Express"],
    current: false,
  },
  {
    role: "Cloud Engineering Lead",
    company: "Google Developer Student Club",
    period: "Sep 2020 – Apr 2021",
    type: "Community",
    description: [
      "Led the cloud engineering vertical at Navrachana University's GDSC chapter.",
      "Ran workshops helping students learn and build on Google Cloud Platform.",
    ],
    tags: ["Google Cloud", "Leadership", "Community"],
    current: false,
  },
  {
    role: "Hackathon Ambassador",
    company: "Codezoned",
    period: "Aug 2020",
    type: "Contract",
    description: [
      "Ambassador for the Codezoned Hack Against Covid hackathon.",
    ],
    tags: ["Community"],
    current: false,
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="py-28 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="text-xs font-mono text-primary tracking-widest uppercase">03 / Experience</span>
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold">Where I&apos;ve Worked</h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

          <div className="flex flex-col gap-10">
            {experience.map((exp, i) => (
              <motion.div
                key={`${exp.company}-${i}`}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-6"
              >
                {/* Timeline dot */}
                <div className="relative shrink-0 mt-1.5">
                  <div className={`w-3.5 h-3.5 rounded-full border-2 transition-colors ${exp.current ? "border-primary bg-primary/20" : "border-border bg-background"}`} />
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">{exp.role}</h3>
                      <p className="text-primary text-sm font-medium">{exp.company}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-mono text-muted-foreground">{exp.period}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full border border-border text-muted-foreground mt-1 inline-block">
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {exp.description.map((d, j) => (
                      <li key={j} className="flex gap-2.5 text-sm text-muted-foreground">
                        <span className="text-primary/60 mt-1 shrink-0 text-xs">▸</span>
                        {d}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-mono border border-border">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
