"use client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import cls from "clsx"
import type { LaunchpadsInfo } from "@/types"
import { formatNumber, percent } from "@/utils/format"
import { use, useMemo, useState } from "react"
import { getLaunchpadStats } from "@/utils"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Icon from "@/components/icon"
import DurationFilter, { Duration } from "./duration-filter"

interface Props {
  data: Promise<LaunchpadsInfo[]>
}

function getOpacity(percent: number) {
  return 0.2 + percent * 0.1
}

function getBackground(percent: number) {
  return `linear-gradient(to right, rgba(66, 179, 245, ${getOpacity(
    percent
  )}) ${percent * 100}%, transparent ${percent * 100}%)`
}

const headerClass = "text-sm text-white-100"

export default function LaunchpadsTable(props: Props) {
  const [duration, setDuration] = useState<Duration>("1d")

  const list = use(props.data).slice(0, 10)

  const totalVolume = useMemo(() => {
    return list.reduce(
      (acc, item) => acc + getLaunchpadStats(item, duration).volume,
      0
    )
  }, [list])

  return (
    <Card className="mt-4">
      <CardHeader className="flex items-center">
        <CardTitle> Launchpads Detail </CardTitle>
        <CardAction className="flex items-center gap-2 ml-auto">
          <div className="text-sm text-gray-400 ml-auto">Duration</div>
          <DurationFilter value={duration} onChange={setDuration} />
        </CardAction>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Top 10 Launchpads</TableCaption>
          <TableHeader>
            <TableRow className="text-sm text-gray-400">
              <TableHead className={headerClass}>Launchpad</TableHead>
              <TableHead className={headerClass}>{duration} Volume</TableHead>
              <TableHead className={headerClass}>{duration} Trades</TableHead>
              <TableHead className={headerClass}>{duration} Mints</TableHead>
              <TableHead className={headerClass}>{duration} Bonded</TableHead>
              <TableHead className={headerClass}>{duration} Bonded %</TableHead>
              <TableHead className={cls(headerClass, "text-right")}>
                {duration} Market Share
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {list.map(item => {
              const stats = getLaunchpadStats(item, duration)
              return (
                <TableRow
                  className="relative"
                  key={item.launchpad}
                  style={{
                    background: getBackground(stats.volume / totalVolume),
                  }}
                >
                  <TableCell className="font-medium">
                    <div className="flex flex-row items-center gap-2">
                      <Icon src={item.icon} size={16} />
                      {item.launchpad}
                    </div>
                  </TableCell>

                  <TableCell className="text-blue-500">
                    {formatNumber(stats.volume)}
                  </TableCell>
                  <TableCell>{stats.traders}</TableCell>

                  <TableCell>{stats.mints}</TableCell>
                  <TableCell>{stats.graduates}</TableCell>
                  <TableCell>{percent(stats.graduates, stats.mints)}</TableCell>
                  <TableCell className="text-right">
                    {formatNumber(stats.marketShare)} %
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total Liquidity</TableCell>
              <TableCell className="text-right">
                {formatNumber(totalVolume)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  )
}
