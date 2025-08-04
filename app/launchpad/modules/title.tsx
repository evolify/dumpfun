"use client"

import { LaunchpadConfig } from "@/constants"
import { Suspense, use } from "react"
import { LaunchpadsInfo } from "@/types"
import { Favicon } from "@/components/icon"
import { launchpad } from "../utils"

interface Props {
  data: Promise<LaunchpadsInfo[]>
}

function TitleContent(props: Props) {
  const data = use(props.data)
  const launchpadConfig = LaunchpadConfig[launchpad]

  return (
    <div className="flex flex-row items-center gap-2 flex-1">
      <Favicon url={launchpadConfig?.home} size={16} />
      <div className="text-xl font-bold">{launchpadConfig?.name}</div>
      <div className="text-sm text-gray-400 ml-4"></div>
    </div>
  )
}

export default function Title(props: Props) {
  return (
    <Suspense>
      <TitleContent {...props} />
    </Suspense>
  )
}
