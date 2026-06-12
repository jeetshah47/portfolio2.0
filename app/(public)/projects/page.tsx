import { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArrowUpRight } from "lucide-react"
import { projects } from "@/lib/projects"

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of production systems, client work, and personal projects built by Jeet Shah.",
}

export default function ProjectsPage() {
  const categories = ["professional", "client", "personal"] as const

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3">Portfolio</p>
          <h1 className="text-4xl font-bold mb-4">All Projects</h1>
          <p className="text-muted-foreground max-w-xl">
            Production systems, client work, and personal experiments — built with a focus on scalability and clean code.
          </p>
        </div>

        {categories.map((cat) => {
          const group = projects.filter((p) => p.category === cat)
          if (!group.length) return null
          return (
            <div key={cat} className="mb-14">
              <h2 className="text-xs font-mono text-primary uppercase tracking-widest mb-6 capitalize">
                {cat} Work
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.map((project) => (
                  <Link key={project.slug} href={`/projects/${project.slug}`}>
                    <Card className="h-full hover:border-primary/50 transition-colors group cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                          <ArrowUpRight size={16} className="text-muted-foreground shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
                        </div>
                        <p className="text-sm text-muted-foreground">{project.tagline}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.slice(0, 4).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                          ))}
                          {project.tags.length > 4 && (
                            <Badge variant="secondary" className="text-xs">+{project.tags.length - 4}</Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
