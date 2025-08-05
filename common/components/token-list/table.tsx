import { Duration, PoolInfo } from "@/types"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { getTokenStats, getAxiomLink, getGmgnLink } from "@/utils"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { NavLink } from "@/components/nav-link"
import { TrackLabel } from "@/utils/track"
import { formatNumber, formatTime } from "@/utils/format"
import { useStickyTable } from "@/hooks/table"
import { getFdvColor, getTimeColor } from "@/utils/color"
import { cn } from "@/lib/utils"

interface Props {
  data: PoolInfo[]
  duration: Duration
  onItemClick: (data: PoolInfo) => void
}

export default function DataTable({ data, duration, onItemClick }: Props) {
  const { tableRef } = useStickyTable()
  return (
    <Table ref={tableRef} className="bg-card">
      <TableHeader>
        <TableRow className="text-sm text-gray-400">
          <TableHead>Name / Age</TableHead>
          <TableHead>Market Cap</TableHead>
          <TableHead>Holders</TableHead>
          <TableHead>Traders</TableHead>
          <TableHead>{duration} Volume</TableHead>
          <TableHead>Buys / Sells</TableHead>
          <TableHead>Liquidity</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map(item => {
          const stats = getTokenStats(item.baseAsset, duration)
          return (
            <TableRow
              key={item.id}
              className={cn(item.latest && "bg-sky-950")}
              onClick={() => onItemClick(item)}
            >
              <TableCell className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-sm overflow-hidden">
                  <img src={item.baseAsset.icon} />
                </div>
                <div>
                  <div>{item.baseAsset.symbol}</div>
                  <div className={getTimeColor(item.createdAt)}>
                    {formatTime(item.createdAt)}
                  </div>
                </div>
              </TableCell>
              <TableCell className={getFdvColor(item.baseAsset.mcap)}>
                {formatNumber(item.baseAsset.mcap)}
              </TableCell>
              <TableCell>{formatNumber(item.baseAsset.holderCount)}</TableCell>
              <TableCell>{formatNumber(stats.numTraders)}</TableCell>
              <TableCell>
                {formatNumber(stats.buyVolume + stats.sellVolume)}
              </TableCell>
              <TableCell>
                <div>{formatNumber(stats.numBuys)}</div>
                <div>{formatNumber(stats.numSells)}</div>
              </TableCell>
              <TableCell>{formatNumber(item.liquidity)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Trade</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="start">
                    <DropdownMenuItem className="p-0">
                      <NavLink
                        className="w-full"
                        label="Axiom"
                        value={getAxiomLink(item.baseAsset.id)}
                        trackLabel={TrackLabel.AXIOM}
                      />
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="p-0">
                      <NavLink
                        className="w-full"
                        label="Gmgn"
                        value={getGmgnLink(item.baseAsset.id)}
                        trackLabel={TrackLabel.GMGN}
                      />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
