import Link from "next/link"
import { Mail } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/icons"

export function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-bold">
            jeetshah<span className="text-primary">.</span><span className="text-muted-foreground">dev</span>
          </span>
          <span className="text-muted-foreground text-xs">·</span>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Jeet Shah
          </p>
        </div>

        <p className="text-xs text-muted-foreground font-mono hidden md:block">
          Built with Next.js · Tailwind · Neon
        </p>

        <div className="flex items-center gap-3">
          <Link href="https://github.com/jeetshah47" target="_blank" rel="noopener noreferrer"
            className="p-1.5 text-muted-foreground hover:text-primary transition-colors">
            <GithubIcon size={16} />
          </Link>
          <Link href="https://www.linkedin.com/in/jeetworks4/" target="_blank" rel="noopener noreferrer"
            className="p-1.5 text-muted-foreground hover:text-primary transition-colors">
            <LinkedinIcon size={16} />
          </Link>
          <Link href="mailto:jeetshahajwa@gmail.com"
            className="p-1.5 text-muted-foreground hover:text-primary transition-colors">
            <Mail size={16} />
          </Link>
        </div>
      </div>
    </footer>
  )
}
