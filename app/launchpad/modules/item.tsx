import Percent from "@/components/percent"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Durations } from "@/hooks/duration"
import type { PoolInfo, PoolStats, TokenInfo } from "@/types"
import { getAxiomLink, getGmgnLink, getTokenStats } from "@/utils"
import { copy } from "@/utils/client"
import { formatAddress, formatNumber, formatTime } from "@/utils/format"
import { click, TrackLabel } from "@/utils/track"
import { Copy, Twitter } from "lucide-react"

interface Props {
  data: PoolInfo
  onClick: (data: PoolInfo) => void
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

export default function Item(props: Props) {
  const { data, onClick } = props
  const { baseAsset } = data
  function copyAddr(e: React.MouseEvent) {
    e?.stopPropagation()
    copy(baseAsset.id)
  }
  function to(link: string, label: TrackLabel, e?: React.MouseEvent) {
    e?.stopPropagation()
    click(label)
    window.open(link)
  }
  return (
    <Card className="px-0 py-0 gap-0" onClick={() => onClick(data)}>
      <div className="flex flex-row items-center gap-2 px-3 py-2">
        <img src={data.baseAsset.icon} className="w-8 h-8 rounded-[6px]" />
        <div className="flex-1">
          <div className="flex flex-row items-center gap-4">
            <span> {data.baseAsset.symbol} </span>
            <div
              className="flex flex-row items-center gap-1 text-sm text-gray-400"
              onClick={e => copyAddr(e)}
            >
              {formatAddress(data.baseAsset.id)}
              <Copy className="w-4 h-4" />
            </div>
          </div>
          <div className="text-sm text-gray-400">{data.baseAsset.name}</div>
        </div>
        <div className="self-start px-2">{formatTime(data.createdAt)}</div>
      </div>
      <div className="px-3 pb-2 flex flex-col gap-1">
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
      <Separator />
      <div className="flex flex-row items-center gap-2 px-2 py-1">
        {baseAsset.twitter && (
          <Button
            variant="secondary"
            size="sm"
            onClick={e => to(baseAsset.twitter, TrackLabel.TWITTER, e)}
          >
            <Twitter className="w-4 h-4 text-blue-500" />
          </Button>
        )}

        <Button
          variant="secondary"
          size="sm"
          className="ml-auto"
          onClick={e => to(getGmgnLink(baseAsset.id), TrackLabel.GMGN, e)}
        >
          GMGN
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={e => to(getAxiomLink(baseAsset.id), TrackLabel.AXIOM, e)}
        >
          Axiom
        </Button>
      </div>
    </Card>
  )
}
