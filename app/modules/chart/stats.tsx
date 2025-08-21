"use client"

import { useState, useMemo } from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { LaunchpadsInfo } from "@/types"
import { formatDate, formatNumber } from "@/utils/format"

const chartConfig: Record<string, any> = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
  others: {
    label: "Others",
  },
}

interface Props {
  data: LaunchpadsInfo[]
}

type StatType = "dailyStats" | "newDailyStats"
export default function Stats({ data }: Props) {
  const [type, setType] = useState<StatType>("dailyStats")

  const { chartData, keys } = useMemo(() => {
    const times = data[0][type]
      .map(t => formatDate(t.date))
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    const launchpads = data.slice(0, 5)
    const chartData = times.map(t => {
      const item: Record<string, any> = {
        date: t,
      }
      let total = 0
      launchpads.forEach(d => {
        const stat = d[type].find(s => formatDate(s.date) === t)
        total += stat?.marketShare || 0
        item[d.id] = stat?.marketShare
        chartConfig[d.id] = {
          label: d.launchpad,
        }
      })
      item.others = 100 - total
      return item
    })
    return { chartData, keys: launchpads.map(d => d.id).concat("others") }
  }, [data, type])

  function getVolume(launchpad: string, date: string) {
    const d = data.find(d => d.id === launchpad)
    const stat = d?.[type].find(s => formatDate(s.date) === date)
    if (stat) {
      return formatNumber(stat.volume)
    }
    return "-"
  }

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Launchpad Stats</CardTitle>
          <CardDescription>
            Showing marketShare and volume for the last months
          </CardDescription>
        </div>
        <Select value={type} onValueChange={val => setType(val as StatType)}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="dailyStats" className="rounded-lg">
              Total Volumn
            </SelectItem>
            <SelectItem value="newDailyStats" className="rounded-lg">
              New Volumn
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              {keys.map(k => (
                <linearGradient key={k} id={k} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={`var(--chart-${k})`}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={`var(--chart-${k})`}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  valueFormatter={(value, item) =>
                    `${value.toFixed(2)}% (${getVolume(
                      item.dataKey,
                      item.payload.date
                    )})`
                  }
                />
              }
            />
            {keys.map(t => (
              <Area
                key={t}
                dataKey={t}
                type="natural"
                fill={`url(#${t})`}
                stroke={`var(--chart-${t})`}
                stackId="a"
              />
            ))}
            <ChartLegend
              className="flex-wrap"
              content={<ChartLegendContent payload={[]} />}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
