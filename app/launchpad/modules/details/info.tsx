import Percent from "@/components/percent"
import { Separator } from "@/components/ui/separator"
import { Durations } from "@/hooks/duration"
import { PoolInfo, PoolStats, TokenInfo } from "@/types"
import { getKlineLink, getTokenStats } from "@/utils"
import { formatNumber } from "@/utils/format"

interface Props {
  data: PoolInfo
}
function renderDurationValue(
  token: TokenInfo,
  key: keyof PoolStats,
  render: (value: number) => React.ReactNode = value => <span>{value}</span>
) {
  return Durations.map(t => {
    const stat = getTokenStats(token, t)
    if (stat?.[key]) {
      return (
        <div key={t} className="flex flex-row items-center gap-1">
          <span className="text-sm text-gray-400">{t}</span>
          {render(stat[key])}
        </div>
      )
    }
  })
}
export default function Info({ data }: Props) {
  const { baseAsset } = data
  return (
    <div className="flex flex-col h-full">
      <div className="h-0 flex-1 relative overflow-hidden">
        <iframe
          src={getKlineLink(baseAsset.id)}
          width="100%"
          className="border-none h-[calc(100%+36px)]"
        />
      </div>

      <div className="py-4 flex flex-col gap-1">
        <div className="flex flex-row items-center gap-2">
          <div>
            <span className="text-sm text-gray-400">MC</span>
            <span className="ml-1">{formatNumber(baseAsset.mcap)}</span>
          </div>
          <Separator orientation="vertical" className="min-h-4" />
          <div>
            <span className="text-sm text-gray-400">Liquidity</span>
            <span className="ml-1">{formatNumber(baseAsset.liquidity)}</span>
          </div>
          <Separator orientation="vertical" className="min-h-4" />
          <div>
            <span className="text-sm text-gray-400">Holders</span>
            <span className="ml-1">{formatNumber(baseAsset.holderCount)}</span>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <span className="text-sm text-gray-400">Price</span>
          {renderDurationValue(baseAsset, "priceChange", val => (
            <Percent value={val} />
          ))}
        </div>
        <div className="flex flex-row items-center gap-2">
          <span className="text-sm text-gray-400">Volume</span>
          {renderDurationValue(baseAsset, "volumeChange", val => (
            <Percent value={val} />
          ))}
        </div>
        <div className="flex flex-row items-center gap-2">
          <span className="text-sm text-gray-400">Holder</span>
          {renderDurationValue(baseAsset, "holderChange", val => (
            <Percent value={val} />
          ))}
        </div>
      </div>
    </div>
  )
}
