import Header from "@/components/header"
import { Toaster } from "sonner"
import { getLaunchpadsStats } from "@/utils/api"
import { Separator } from "@/components/ui/separator"
import List from "./modules/list"
import "./styles.css"
import Title from "./modules/title"
import { Suspense } from "react"
import { SWRConfig } from "swr"
import Modal from "@/components/modal"

export default function Launchpad() {
  const data = getLaunchpadsStats()

  return (
    <div>
      <Header title={<Title data={data} />} />
      <Separator />
      <div className="p-5">
        <Suspense>
          <List />
        </Suspense>
      </div>
      <Toaster position="top-center" richColors theme="dark" duration={1500} />
    </div>
  )
}
