"use client"

import { LaunchpadConfig } from "@/constants"
import { Suspense, use, useMemo } from "react"
import { formatNumber } from "@/utils/format"
import { Launchpad, LaunchpadsInfo } from "@/types"
import Icon from "@/components/icon"
import { getFavicon } from "@/utils"
import { useQuery } from "@/hooks"

interface Props {
  data: Promise<LaunchpadsInfo[]>
}

export default function Title(props: Props) {
  const data = use(props.data)
  const launchpad = useQuery("launchpad") as Launchpad
  const launchpadConfig = LaunchpadConfig[launchpad]

  const launchpadInfo = useMemo(() => {
    return data?.find(t => t.id === launchpad)
  }, [data])

  return (
    <Suspense>
      <div className="flex flex-row items-center gap-2 flex-1">
        <Icon url={getFavicon(launchpadConfig?.home)} size={16} />
        <div className="text-xl font-bold">{launchpadConfig?.name}</div>
        <div className="text-sm text-gray-400 ml-4">
          {formatNumber(launchpadInfo?.liquidity)}
        </div>
      </div>
    </Suspense>
  )
}
