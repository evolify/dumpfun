import Icon from "@/components/icon"
import { Card } from "@/components/ui/card"
import type { LaunchpadsInfo } from "@/types"
import { getFavicon } from "@/utils"
import { formatNumber } from "@/utils/format"
import { use, useMemo } from "react"

interface Props {
  data: Promise<LaunchpadsInfo[]>
}

function renderItem(label: string, value: number) {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="text-sm text-gray-300">{label}</div>
      <div className="">{formatNumber(value)}</div>
    </div>
  )
}
export default function Basic(props: Props) {
  const list = use(props.data).slice(0, 5)
  return (
    <div className="flex flex-row flex-wrap gap-4">
      {list.map(item => (
        <Card key={item.id} className="flex-1 px-3 py-2 gap-0">
          <div className="flex flex-row items-center gap-2">
            <Icon src={item.icon} size={16} />
            <div className="text-sm text-gray-300">{item.launchpad}</div>
          </div>
          <div className="flex flex-row items-baseline justify-between mb-2">
            <div className="text-sm text-gray-300">Liquidity</div>
            <div className="text-4xl">{formatNumber(item.liquidity)}</div>
          </div>
          {renderItem("24h volume", item.stats24h.volume)}
          {renderItem("24h traders", item.stats24h.traders)}
        </Card>
      ))}
    </div>
  )
}
