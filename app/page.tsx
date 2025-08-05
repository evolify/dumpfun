import Header from "@/components/header"
import { Separator } from "@/components/ui/separator"
import { getLaunchpadsStats } from "@/utils/api"
import Chart from "./modules/chart"
import { Suspense } from "react"
import LaunchpadsTable from "./modules/table"
import Trending from "./modules/trending"

export default function Home() {
  const data = getLaunchpadsStats()
  return (
    <div>
      <Header />
      <Separator />
      <div className="p-5 flex flex-col gap-5">
        <Suspense>
          <Chart data={data} />
          <Trending />
          <LaunchpadsTable data={data} />
        </Suspense>
      </div>
    </div>
  )
}
