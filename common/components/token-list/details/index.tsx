import { PoolInfo } from "@/types"
import "./style.css"
import { copy } from "@/utils/client"
import { click, TrackLabel } from "@/utils/track"
import {
  formatAddress,
  formatNumber,
  formatString,
  formatTime,
} from "@/utils/format"
import { Copy, Search, Twitter } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { getAxiomLink, getGmgnLink, searchOnTwitter } from "@/utils"
import { Button } from "@/components/ui/button"
import { AxiomIcon, GmgnIcon } from "@/components/icon"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Info from "./info"
import Holders from "./holders"
import { cn } from "@/lib/utils"
import { getFdvColor } from "@/utils/color"

interface Props {
  data: PoolInfo | null
}

export default function Detail(props: Props) {
  const { data } = props

  if (!data) return null

  const { baseAsset } = data

  function copyAddr() {
    copy(baseAsset.id)
  }
  function to(link: string, label: TrackLabel) {
    click(label)
    window.open(link)
  }
  function toSearch() {
    click(TrackLabel.TWITTER)
    searchOnTwitter(baseAsset.id)
  }

  return (
    <div
      className="p-0 gap-0 flex-1 flex flex-col"
      onClick={e => e.stopPropagation()}
    >
      <div className="flex flex-row items-center gap-2 px-4 mt-2">
        <img src={data.baseAsset.icon} className="w-8 h-8 rounded-[6px]" />
        <div className="flex-1">
          <div className="flex flex-row items-center gap-4">
            <span> {data.baseAsset.symbol} </span>
            <div className="text-sm text-gray-400">
              {formatString(data.baseAsset.name)}
            </div>
            <div
              className="flex flex-row items-center gap-1 text-sm text-gray-400"
              onClick={copyAddr}
            >
              {formatAddress(data.baseAsset.id)}
              <Copy className="w-4 h-4" />
            </div>
            <div className="ml-auto">{formatTime(data.createdAt)}</div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div>
              <span className="text-sm text-gray-400">M</span>
              <span className={cn("ml-1", getFdvColor(baseAsset.mcap))}>
                {formatNumber(baseAsset.mcap)}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-400">L</span>
              <span className="ml-1">{formatNumber(baseAsset.liquidity)}</span>
            </div>
            <div>
              <span className="text-sm text-gray-400">H</span>
              <span className="ml-1">
                {formatNumber(baseAsset.holderCount)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="info" className="grow-1 h-0 mt-2 gap-0">
        <TabsContent className="px-5" value="info">
          <Info data={data} />
        </TabsContent>
        <TabsContent
          value="holders"
          className="px-5 h-0 flex-1 overflow-y-auto"
        >
          <Holders address={baseAsset.id} supply={baseAsset.circSupply} />
        </TabsContent>

        <Separator />
        <div className="flex flex-row items-center gap-2 px-2 py-2">
          <Button variant="secondary" size="sm" onClick={toSearch}>
            <Search className="w-4 h-4 text-cyan-500" />
          </Button>
          {baseAsset.twitter && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => to(baseAsset.twitter, TrackLabel.TWITTER)}
            >
              <Twitter className="w-4 h-4 text-blue-500" />
            </Button>
          )}

          <TabsList className="self-stretch ml-auto">
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="holders">
              Holder({formatNumber(baseAsset.holderCount)})
            </TabsTrigger>
          </TabsList>

          <Button
            variant="secondary"
            size="sm"
            className="ml-auto"
            onClick={() => to(getGmgnLink(baseAsset.id), TrackLabel.GMGN)}
          >
            <GmgnIcon />
            <span className="hidden md:block"> GMGN </span>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => to(getAxiomLink(baseAsset.id), TrackLabel.AXIOM)}
          >
            <AxiomIcon />
            <span className="hidden md:block"> Axiom </span>
          </Button>
        </div>
      </Tabs>
    </div>
  )
}
