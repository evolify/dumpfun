import { LaunchpadConfig } from "@/constants"
import type {
  Duration,
  Holder,
  Launchpad,
  LaunchpadsInfo,
  PoolInfo,
} from "@/types"
import { useEffect, useMemo, useRef } from "react"
import useSWR from "swr"

const LaunchpadsStatsUrl = "https://datapi.jup.ag/v1/launchpads/stats"
const LaunchpadDetailUrl = "https://datapi.jup.ag/v1/pools/toptraded"
const HoldersUrl = "https://datapi.jup.ag/v1/holders"
const NarrativeUrl = "https://datapi.jup.ag/v1/chaininsight/narrative"

export const fetcher = (resource: string, init: RequestInit) =>
  fetch(resource, init).then(res => res.json())

async function getLaunchpadsStats() {
  const res = await fetch(LaunchpadsStatsUrl)
  const data = await res.json()
  return (
    data?.launchpads.map((t: LaunchpadsInfo) => ({
      ...t,
      id: t.launchpad.replaceAll(".", "_").replaceAll("-", "_"),
    })) || []
  )
}

async function getLaunchpadDetail(url: string) {
  const res = await fetch(url)
  const data = await res.json()
  return (data?.pools as PoolInfo[]) || []
}

export function useLaunchpadsStats() {
  const { data, isLoading, error, mutate } = useSWR<LaunchpadsInfo[]>(
    LaunchpadsStatsUrl,
    getLaunchpadsStats
  )

  return {
    data,
    isLoading,
    error,
    mutate,
  }
}

export function useLaunchpadDetail(launchpad: Launchpad, duration: Duration) {
  const config = LaunchpadConfig[launchpad]
  const url = `${LaunchpadDetailUrl}/${duration}?launchpads=${config.launchpad}`
  const { data, isLoading, isValidating, error, mutate } = useSWR(
    url,
    getLaunchpadDetail,
    {
      onSuccess: data => {
        if (data) {
          if (prevData.current.length > 0) {
            data.forEach((item: PoolInfo) => {
              if (
                !prevData.current.some(
                  t => t.baseAsset.id === item.baseAsset.id
                )
              ) {
                item.latest = true
              }
            })
          }
          prevData.current = data
        }
      },
    }
  )

  const prevData = useRef<PoolInfo[]>([])

  return {
    data,
    isLoading,
    isValidating,
    error,
    mutate,
  }
}

export function useHolders(addr: string) {
  const { data, isLoading, error, mutate } = useSWR<{
    count: number
    holders: Holder[]
  }>(`${HoldersUrl}/${addr}`, fetcher)
  return {
    holders: data?.holders || [],
    count: data?.count || 0,
    isLoading,
    error,
    mutate,
  }
}

export function useNarrative(addr: string) {
  const { data } = useSWR(`${NarrativeUrl}/${addr}`, fetcher)
  return data?.narrative || ""
}
