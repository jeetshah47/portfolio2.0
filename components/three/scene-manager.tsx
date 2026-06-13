"use client"

import { useScrollProgress, sectionProgress } from "./scroll-context"
import { HeroObject } from "./objects/hero-object"
import { AboutObject } from "./objects/about-object"
import { SkillsObject } from "./objects/skills-object"
import { ExperienceObject } from "./objects/experience-object"
import { ProjectsObject } from "./objects/projects-object"
import { ContactObject } from "./objects/contact-object"
import { PostProcessing } from "./post-processing"

// Scroll ranges for each section (0–1 of full page)
const RANGES = {
  hero:       [0.00, 0.18] as [number, number],
  about:      [0.15, 0.35] as [number, number],
  skills:     [0.32, 0.52] as [number, number],
  experience: [0.49, 0.67] as [number, number],
  projects:   [0.64, 0.83] as [number, number],
  contact:    [0.80, 1.00] as [number, number],
}

interface SceneManagerProps {
  isDark: boolean
}

export function SceneManager({ isDark }: SceneManagerProps) {
  const scroll = useScrollProgress()
  const color = isDark ? "#a855f7" : "#7c3aed"

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={0.4} color={color} />

      <HeroObject
        progress={sectionProgress(scroll, ...RANGES.hero)}
        color={color}
      />
      <AboutObject
        progress={sectionProgress(scroll, ...RANGES.about)}
        color={color}
      />
      <SkillsObject
        progress={sectionProgress(scroll, ...RANGES.skills)}
        color={color}
      />
      <ExperienceObject
        progress={sectionProgress(scroll, ...RANGES.experience)}
        color={color}
      />
      <ProjectsObject
        progress={sectionProgress(scroll, ...RANGES.projects)}
        color={color}
      />
      <ContactObject
        progress={sectionProgress(scroll, ...RANGES.contact)}
        color={color}
      />

      <PostProcessing />
    </>
  )
}
