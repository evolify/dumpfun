export enum Launchpad {
  PumpFun = "pump_fun",
  BonkFun = "letsbonk_fun",
  JupStudio = "jup_studio",
  Believe = "Believe",
  Moonshot = "moonshot",
}
export interface LaunchpadsStats {
  graduates: number
  marketShare: number
  mints: number
  traders: number
  volume: number
}

export interface LaunchpadsInfo {
  id: string
  launchpad: string
  liquidity: number
  icon: string
  stats5m: LaunchpadsStats
  stats1h: LaunchpadsStats
  stats6h: LaunchpadsStats
  stats24h: LaunchpadsStats
}

export type Duration = "5m" | "1h" | "6h" | "24h"

export interface PoolStats {
  priceChange: number
  holderChange: number
  liquidityChange: number
  volumeChange: number
  buyVolume: number
  sellVolume: number
  buyOrganicVolume: number
  sellOrganicVolume: number
  numBuys: number
  numSells: number
  numTraders: number
  numOrganicBuyers: number
  numNetBuyers: number
}
export interface TokenInfo {
  id: string
  name: string
  symbol: string
  icon: string
  decimals: number
  twitter: string
  dev: string
  circSupply: number
  totalSupply: number
  tokenProgram: string
  launchpad: string
  partnerConfig: string
  firstPool: {
    id: string
    createdAt: string // ISO 日期字符串
  }
  holderCount: number
  audit: {
    mintAuthorityDisabled: boolean
    freezeAuthorityDisabled: boolean
    topHoldersPercentage: number
    devMigrations: number
  }
  organicScore: number
  organicScoreLabel: string
  tags: string[]
  graduatedPool: string
  graduatedAt: string // ISO 日期字符串
  createdAt: string // ISO 日期字符串
  fdv: number
  mcap: number
  usdPrice: number
  priceBlockId: number
  liquidity: number
  stats5m: PoolStats
  stats1h: PoolStats
  stats6h: PoolStats
  stats24h: PoolStats
  ctLikes: number
  smartCtLikes: number
}

export interface PoolInfo {
  baseAsset: TokenInfo
  id: string
  createdAt: string
  chain: string
  liquidity: number
  dex: string
  quoteAsset: string
  type: string
  updatedAt: string
  volume24h: number
}

export interface Holder {
  address: string
  amount: number
  solBalance: string
  tags: Array<{ id: string; name: string }>
}
