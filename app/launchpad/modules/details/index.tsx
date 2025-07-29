import { Card } from "@/components/ui/card"
import { PoolInfo } from "@/types"
import "./style.css"
import { copy } from "@/utils/client"
import { click, TrackLabel } from "@/utils/track"
import { formatAddress, formatTime } from "@/utils/format"
import { Copy, Search, Twitter } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { getAxiomLink, getGmgnLink, searchOnTwitter } from "@/utils"
import { Button } from "@/components/ui/button"
import { AxiomIcon, GmgnIcon } from "@/components/icon"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Info from "./info"
import Holders from "./holders"
import { Badge } from "@/components/ui/badge"

interface Props {
  data: PoolInfo | null
  onClose: () => void
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
  function toSearch() {
    click(TrackLabel.TWITTER)
    searchOnTwitter(baseAsset.id)
  }

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black/70 z-1000 flex flex-col items-center justify-center"
      onClick={onClose}
    >
      <Card className="detail p-0 gap-0" onClick={e => e.stopPropagation()}>
        <div className="flex flex-row items-center gap-2 p-4">
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
              <div className="ml-auto">{formatTime(data.createdAt)}</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm text-gray-400">{data.baseAsset.name}</div>
              <Badge variant="secondary" className="ml-auto">
                Dev Tokens {baseAsset.audit.devMigrations}
              </Badge>
              <Badge variant="secondary">
                Top Holde {baseAsset.audit.topHoldersPercentage.toFixed(2)}%
              </Badge>
            </div>
          </div>
        </div>

        <Tabs defaultValue="info" className="grow-1 h-0 px-5">
          <TabsList className="self-stretch w-full">
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="holders">
              Holder({baseAsset.holderCount})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="info">
            <Info data={data} />
          </TabsContent>
          <TabsContent value="holders" className="h-0 flex-1 overflow-y-auto">
            <Holders address={baseAsset.id} supply={baseAsset.circSupply} />
          </TabsContent>
        </Tabs>

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

          <Button
            variant="secondary"
            size="sm"
            className="ml-auto"
            onClick={() => to(getGmgnLink(baseAsset.id), TrackLabel.GMGN)}
          >
            <GmgnIcon />
            GMGN
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => to(getAxiomLink(baseAsset.id), TrackLabel.AXIOM)}
          >
            <AxiomIcon />
            Axiom
          </Button>
        </div>
      </Card>
    </div>
  )
}
