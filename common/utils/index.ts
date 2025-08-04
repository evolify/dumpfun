import type {
  Duration,
  Launchpad,
  LaunchpadsInfo,
  LaunchpadsStat,
  PoolStats,
  StatDuration,
  TokenInfo,
} from "@/types"

export const isDev = process.env.NODE_ENV === "development"

export function fetcher(url: string, init?: RequestInit) {
  return fetch(url, init).then(res => res.json())
}

export function getLaunchpad(data: LaunchpadsInfo[], launchpad: Launchpad) {
  return data.find(item => item.id === launchpad)
}

export function getLaunchpadStats(
  data?: LaunchpadsInfo,
  duration?: StatDuration
) {
  if (!data) return {} as LaunchpadsStat
  return data[`stats${duration}` as keyof LaunchpadsInfo] as LaunchpadsStat
}

export function getTokenStats(data?: TokenInfo, duration?: Duration) {
  if (!data) return {} as PoolStats
  return data[`stats${duration}` as keyof TokenInfo] as PoolStats
}

export function getAxiomLink(addr = "") {
  if (addr) {
    return `https://axiom.trade/t/${addr}/@gmail`
  }
  return "https://axiom.trade/@gmail"
}

export function getGmgnLink(addr = "") {
  if (addr) {
    return `https://gmgn.ai/sol/token/XqhPEmrY_${addr}`
  }
  return `https://gmgn.ai/?ref=XqhPEmrY`
}

export function getBonkbotLink(addr = "") {
  return `tg://resolve?domain=bonkbot_bot&start=ref_e0crb_ca_${addr}`
}

export function getPepeboostLink(addr = "") {
  return `tg://resolve?domain=pepeboost_sol05_bot&start=ref_0h70jz_ca_${addr}`
}

export function getGmgnbotLink(addr = "") {
  // return `tg://resolve?domain=GMGN_sol_bot&start=i_XqhPEmrY_ca_${addr}`
  return `https://t.me/gmgnaibot?start=i_XqhPEmrY_sol_${addr}`
}

export function getLaunchpadLink(launchpad: Launchpad) {
  return `/launchpad?launchpad=${launchpad}`
}

/**
 * 
 * @param addr token addr
 * @param interval 1S 1 5 15 60 240 720 1D
 * @returns 
 */
export function getKlineLink(addr: string, interval = '5') {
  if (addr) {
    return `https://www.gmgn.cc/kline/sol/${addr}?interval=${interval}`
  }
}

export function getFavicon(url: string) {
  if (!url) return ""
  // return `https://www.google.com/s2/favicons?domain_url=${url}&sz=96`
  return `https://favicon.im/${url}`
}

export function searchOnTwitter(addr: string) {
  const link = `https://x.com/search?q=${addr}`
  window.open(link)
}
