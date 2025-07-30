"use client"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useLaunchpadDetail } from "@/hooks/api"
import { useDuration } from "@/hooks/duration"
import { launchpad } from "../utils"
import Loading from "@/components/loading"
import Item from "./item"
import { LayoutGrid, RotateCcw, Rows3 } from "lucide-react"
import { useState } from "react"
import type { PoolInfo } from "@/types"
import Empty from "@/components/empty"
import { Button } from "@/components/ui/button"
import DataTable from "./data-table"
import Detail from "./details"
import Modal from "@/components/modal"

function renderGrid(data: PoolInfo[], onItemClick: (data: PoolInfo) => void) {
  return (
    <div className="grid grid-cols-3 gap-4 token-list">
      {data?.map(item => (
        <Item key={item.id} data={item} onClick={onItemClick} />
      ))}
    </div>
  )
}

export default function List() {
  const { duration, onChange } = useDuration("5m")
  const [layout, setLayout] = useState<"grid" | "table">("table")
  const { isLoading, data, mutate } = useLaunchpadDetail(launchpad!, duration)
  const [selected, setSelected] = useState<PoolInfo | null>(null)

  function select(data: PoolInfo) {
    setSelected(data)
  }

  function refresh() {
    mutate(data)
  }

  function renderContent() {
    if (isLoading) {
      return <Loading />
    }

    if (!data) {
      return <Empty />
    }

    if (layout === "grid") {
      return renderGrid(data, select)
    }

    return <DataTable data={data} duration={duration} onItemClick={select} />
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        <ToggleGroup
          type="single"
          value={duration}
          onValueChange={onChange}
          variant="outline"
        >
          <ToggleGroupItem value="5m">5m</ToggleGroupItem>
          <ToggleGroupItem value="1h">1h</ToggleGroupItem>
          <ToggleGroupItem value="6h">6h</ToggleGroupItem>
          <ToggleGroupItem value="24h">24h</ToggleGroupItem>
        </ToggleGroup>

        <ToggleGroup
          className="ml-auto"
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

        <Button onClick={refresh} variant="outline">
          <RotateCcw />
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
