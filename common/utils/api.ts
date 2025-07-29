import { Launchpad, LaunchpadsInfo } from "@/types"

const LaunchpadsStatsUrl = "https://datapi.jup.ag/v1/launchpads/stats"
const LaunchpadDetailUrl = "https://datapi.jup.ag/v1/pools/toptraded"

const HoldersUrlBase = "https://datapi.jup.ag/v1/holders"

import { ProxyAgent } from "undici"
import { getFavicon } from "."
import { LaunchpadConfig } from "@/constants"

export const isServer = typeof window === "undefined"

export const isDev = process.env.NODE_ENV === "development"

export function runInBrowser(cb: Function) {
  if (!isServer) {
    cb()
  }
}

const proxy = process.env.PROXY

const options = {
  next: {
    revalidate: 10,
  },
  dispatcher: isServer && proxy ? new ProxyAgent(proxy) : undefined,
}

export async function getLaunchpadsStats() {
  const res = await fetch(LaunchpadsStatsUrl, options)
  const data = await res.json()
  return (
    data?.launchpads.map((t: LaunchpadsInfo) => {
      const id = t.launchpad
        .replaceAll(".", "_")
        .replaceAll("-", "_") as Launchpad
      const config = LaunchpadConfig[id]
      return {
        ...t,
        id,
        icon: getFavicon(config?.home),
      }
    }) || []
  )
}

export async function getHolders(addr: string) {
  const res = await fetch(`${HoldersUrlBase}/addr`, options)
  const data = await res.json()
  return data
}
