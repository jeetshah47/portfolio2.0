"use client"

import { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"
import { CalendarDays } from "lucide-react"

const CAL_USERNAME = "jeet-shah-5rleal"

export function CalButton({ className }: { className?: string }) {
  useEffect(() => {
    getCalApi({ namespace: CAL_USERNAME }).then((cal) => {
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#a855f7" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      })
    })
  }, [])

  return (
    <button
      data-cal-namespace={CAL_USERNAME}
      data-cal-link={CAL_USERNAME}
      data-cal-config='{"layout":"month_view"}'
      className={className}
    >
      <CalendarDays size={15} />
      Book a Call
    </button>
  )
}
