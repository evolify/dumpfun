"use client"

import { LaunchpadConfig } from "@/constants"
import { Suspense } from "react"
import { Favicon } from "@/components/icon"
import { launchpad } from "../utils"

function TitleContent() {
  const launchpadConfig = LaunchpadConfig[launchpad]

  return (
    <div className="flex flex-row items-center gap-2 flex-1">
      <Favicon url={launchpadConfig?.home} size={16} />
      <div className="text-xl font-bold">{launchpadConfig?.name}</div>
      <div className="text-sm text-gray-400 ml-4"></div>
    </div>
  )
}

export default function Title() {
  return (
    <Suspense>
      <TitleContent />
    </Suspense>
  )
}
