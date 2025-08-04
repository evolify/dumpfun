"use client"
import { Pie, PieChart } from "recharts"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { LaunchpadsInfo } from "@/types"
import { useMemo, useState } from "react"
import { getLaunchpadStats } from "@/utils"
import { formatNumber } from "@/utils/format"
import DurationFilter, { Duration } from "../duration-filter"

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  pump_fun: {
    label: "pump.fun",
  },
  letsbonk_fun: {
    label: "letsbonk.fun",
  },
  jup_studio: {
    label: "jup.ag",
  },
  Believe: {
    label: "Believe",
  },
  moonshot: {
    label: "Moonshot",
  },
} satisfies ChartConfig

interface Props {
  data: LaunchpadsInfo[]
}

export function Traders({ data }: Props) {
  const [duration, setDuration] = useState<Duration>("1d")
  const chartData = useMemo(() => {
    return data.slice(0, 5).map(item => ({
      label: item.id,
      value: getLaunchpadStats(item, duration).traders,
      fill: `var(--chart-${item.id})`,
    }))
  }, [data, duration])
  return (
    <Card className="flex flex-col flex-1 gap-0 min-w-[300px] py-4">
      <CardHeader className="flex flex-row justify-between items-center pb-0 px-4 h-9">
        <CardTitle>Traders</CardTitle>
        <CardAction>
          <DurationFilter value={duration} onChange={setDuration} />
        </CardAction>
      </CardHeader>
      <CardContent className="flex-1 pb-0 px-4">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  valueFormatter={val => formatNumber(val)}
                />
              }
            />
            <Pie data={chartData} dataKey="value" nameKey="label" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
