import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { CanvasOverlay } from "@/components/three/canvas-overlay"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CanvasOverlay />
      <Navbar />
      <main className="relative z-10 flex-1">{children}</main>
      <Footer />
    </>
  )
}
