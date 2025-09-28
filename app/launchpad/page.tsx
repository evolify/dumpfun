import Header from "@/components/header"
import { Toaster } from "sonner"
import { Separator } from "@/components/ui/separator"
import List from "./modules/list"
import "./styles.css"
import Title from "./modules/title"
import { Suspense } from "react"

export default function Launchpad() {
  return (
    <div>
      <Header title={<Title />} />
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
