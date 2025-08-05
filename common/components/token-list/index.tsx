"use client"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import Loading from "@/components/loading"
import { LayoutGrid, RotateCcw, Rows3 } from "lucide-react"
import { useState } from "react"
import type { Duration, PoolInfo } from "@/types"
import Empty from "@/components/empty"
import { Button } from "@/components/ui/button"
import DataTable from "./table"
import Grid from "./grid"
import Detail from "./details"
import Modal from "@/components/modal"
import { cn } from "@/lib/utils"
import { Card, CardTitle } from "@/components//ui/card"

interface Props {
  data?: PoolInfo[]
  isLoading: boolean
  isValidating: boolean
  onRefresh: () => void
  duration: Duration
  onDurationChange: (value: string) => void
  title?: string
  enableSwitchLayout?: boolean
}

export default function List(props: Props) {
  const {
    data,
    isLoading,
    isValidating,
    onRefresh,
    duration,
    onDurationChange,
    title,
    enableSwitchLayout = true,
  } = props
  const [layout, setLayout] = useState<"grid" | "table">("table")
  const [selected, setSelected] = useState<PoolInfo | null>(null)

  function select(data: PoolInfo) {
    setSelected(data)
  }

  function refresh() {
    onRefresh()
  }

  function renderContent() {
    if (isLoading) {
      return <Loading />
    }

    if (!data) {
      return <Empty />
    }

    if (layout === "grid") {
      return <Grid data={data} onItemClick={select} />
    }

    return (
      <Card className="p-0 overflow-hidden">
        <DataTable data={data} duration={duration} onItemClick={select} />
      </Card>
    )
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {title && <CardTitle className="mr-auto">{title}</CardTitle>}
        <ToggleGroup
          className={cn(!title && "mr-auto")}
          type="single"
          value={duration}
          onValueChange={onDurationChange}
          variant="outline"
        >
          <ToggleGroupItem value="5m">5m</ToggleGroupItem>
          <ToggleGroupItem value="1h">1h</ToggleGroupItem>
          <ToggleGroupItem value="6h">6h</ToggleGroupItem>
          <ToggleGroupItem value="24h">24h</ToggleGroupItem>
        </ToggleGroup>

        {enableSwitchLayout && (
          <ToggleGroup
            type="single"
            value={layout}
            onValueChange={val => setLayout(val as "grid" | "table")}
            variant="outline"
          >
            <ToggleGroupItem value="grid">
              <LayoutGrid />
            </ToggleGroupItem>
            <ToggleGroupItem value="table">
              <Rows3 />
            </ToggleGroupItem>
          </ToggleGroup>
        )}

        <Button disabled={isValidating} onClick={refresh} variant="outline">
          <RotateCcw className={cn(isValidating && "animate-spin")} />
        </Button>
      </div>
      {renderContent()}
      <Modal
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        className="detail"
      >
        <Detail data={selected} />
      </Modal>
    </div>
  )
}
