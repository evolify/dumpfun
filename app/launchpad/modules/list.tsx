"use client"
import { useLaunchpadDetail } from "@/hooks/api"
import { useDuration } from "@/hooks/duration"
import { launchpad } from "../utils"
import TokenList from "@/components/token-list"

export default function List() {
  const { duration, onChange } = useDuration("5m")
  const { isLoading, isValidating, data, mutate } = useLaunchpadDetail(
    launchpad!,
    duration
  )

  function refresh() {
    mutate(data)
  }

  return (
    <TokenList
      data={data}
      isLoading={isLoading}
      isValidating={isValidating}
      onRefresh={refresh}
      duration={duration}
      onDurationChange={onChange}
    />
  )
}
