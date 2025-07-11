import type { LaunchpadsInfo } from "@/types"
import Stats from "./stats"
import { Liquidity } from "./liquidity"
import { Volume } from "./volume"
import { Traders } from "./traders"
import { use } from "react"

interface Props {
  data: Promise<LaunchpadsInfo[]>
}

export default function Chart(props: Props) {
  const data = use(props.data)
  return (
    <div className="mt-4">
      <Stats data={data} />
      <div className="flex flex-row flex-wrap gap-4 mt-4">
        <Liquidity data={data} />
        <Volume data={data} />
        <Traders data={data} />
      </div>
    </div>
  )
}
