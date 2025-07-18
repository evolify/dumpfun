import { Card } from "@/components/ui/card"
import { PoolInfo, PoolStats, TokenInfo } from "@/types"
import "./style.css"
import { copy } from "@/utils/client"
import { click, TrackLabel } from "@/utils/track"
import { formatAddress, formatNumber, formatTime } from "@/utils/format"
import { Copy, Twitter } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Durations } from "@/hooks/duration"
import { getAxiomLink, getGmgnLink, getKlineLink, getTokenStats } from "@/utils"
import Percent from "@/components/percent"
import { Button } from "@/components/ui/button"

interface Props {
  data: PoolInfo | null
  onClose: () => void
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
export default function Detail(props: Props) {
  const { data, onClose } = props
  if (!data) return null
  const { baseAsset } = data

  function copyAddr() {
    copy(baseAsset.id)
  }
  function to(link: string, label: TrackLabel) {
    click(label)
    window.open(link)
  }

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black/50 z-1000 flex flex-col items-center justify-center p-4"
      onClick={onClose}
    >
      <Card className="detail p-0 gap-0" onClick={e => e.stopPropagation()}>
        <div className="flex flex-row items-center gap-2 px-3 py-4">
          <img src={data.baseAsset.icon} className="w-8 h-8 rounded-[6px]" />
          <div className="flex-1">
            <div className="flex flex-row items-center gap-4">
              <span> {data.baseAsset.symbol} </span>
              <div
                className="flex flex-row items-center gap-1 text-sm text-gray-400"
                onClick={copyAddr}
              >
                {formatAddress(data.baseAsset.id)}
                <Copy className="w-4 h-4" />
              </div>
            </div>
            <div className="text-sm text-gray-400">{data.baseAsset.name}</div>
          </div>
          <div className="self-start px-2">{formatTime(data.createdAt)}</div>
        </div>

        {/* chart */}
        <div className="h-[364px] overflow-hidden">
          <iframe
            src={getKlineLink(baseAsset.id)}
            width="100%"
            height={400}
            className="border-none"
          />
        </div>

        <div className="px-3 py-3 flex flex-col gap-1">
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
              <span className="ml-1">
                {formatNumber(baseAsset.holderCount)}
              </span>
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
        <div className="flex flex-row items-center gap-2 px-2 py-2">
          {baseAsset.twitter && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => to(baseAsset.twitter, TrackLabel.TWITTER)}
            >
              <Twitter className="w-4 h-4 text-blue-500" />
            </Button>
          )}

          <Button
            variant="secondary"
            size="sm"
            className="ml-auto"
            onClick={() => to(getGmgnLink(baseAsset.id), TrackLabel.GMGN)}
          >
            GMGN
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => to(getAxiomLink(baseAsset.id), TrackLabel.AXIOM)}
          >
            Axiom
          </Button>
        </div>
      </Card>
    </div>
  )
}
