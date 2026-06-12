"use client"

import { motion } from "framer-motion"

const skillGroups = [
  {
    category: "Languages",
    icon: "{ }",
    skills: ["Go", "TypeScript", "JavaScript", "Python", "Java", "Kotlin", "C", "C++"],
  },
  {
    category: "Frontend",
    icon: "◈",
    skills: ["React.js", "Next.js", "Redux", "Tailwind CSS", "Framer Motion", "HTML", "CSS"],
  },
  {
    category: "Backend",
    icon: "⚙",
    skills: ["Go (Gin)", "Node.js", "Nest.js", "REST APIs", "Microservices", "Workers"],
  },
  {
    category: "Databases",
    icon: "⬡",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "GORM", "Prisma", "Firebase"],
  },
  {
    category: "Cloud & DevOps",
    icon: "☁",
    skills: ["AWS ECS", "AWS ECR", "RDS", "S3", "SNS", "Route 53", "Docker", "CI/CD"],
  },
  {
    category: "Auth & Security",
    icon: "⚿",
    skills: ["JWT", "Keycloak", "RBAC", "Rate Limiting", "ClamAV", "CORS"],
  },
  {
    category: "System Design",
    icon: "◎",
    skills: ["Clean Architecture", "Distributed Systems", "Goroutines", "Actor Model"],
  },
  {
    category: "AI & Tooling",
    icon: "✦",
    skills: ["Cursor AI", "OpenAI APIs", "Playwright", "Postman", "Git", "GitHub"],
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="py-28 px-6 relative">
      {/* Subtle background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] rounded-full bg-primary/3 blur-[100px]" />
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
          <span className="text-xs font-mono text-primary tracking-widest uppercase">02 / Skills</span>
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Tech Stack</h2>
          <p className="text-muted-foreground">Tools and technologies I use to build production systems.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group p-5 rounded-xl border border-border bg-card hover:border-primary/30 hover:bg-primary/3 transition-all"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <span className="text-primary font-mono text-lg">{group.icon}</span>
                <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  {group.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground border border-transparent hover:border-primary/30 hover:text-foreground transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
