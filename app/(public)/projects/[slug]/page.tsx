import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { GithubIcon } from "@/components/icons"
import { getProjectBySlug, projects } from "@/lib/projects"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.tagline,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    applicationCategory: "WebApplication",
    author: { "@type": "Person", name: "Jeet Shah" },
    keywords: project.tags.join(", "),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Back to projects
          </Link>

          <Badge variant="outline" className="capitalize mb-4">{project.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{project.title}</h1>
          <p className="text-lg text-muted-foreground mb-6">{project.tagline}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>

          {(project.liveUrl || project.githubUrl) && (
            <div className="flex gap-3 mb-8">
              {project.liveUrl && (
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                  Live Site <ArrowUpRight size={14} />
                </Link>
              )}
              {project.githubUrl && (
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border text-sm font-medium hover:bg-accent transition-colors">
                  <GithubIcon size={14} /> GitHub
                </Link>
              )}
            </div>
          )}

          <div className="prose prose-neutral dark:prose-invert max-w-none mb-8">
            <p className="text-muted-foreground leading-relaxed">{project.description}</p>
          </div>

          <div className="p-6 rounded-lg border border-border bg-card">
            <h2 className="font-semibold mb-4">Key Highlights</h2>
            <ul className="space-y-2">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="text-primary mt-0.5 shrink-0">▸</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
