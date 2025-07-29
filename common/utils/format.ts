export function formatNumber(value?: number) {
  if (!value) {
    return "0"
  }
  // x.00 需要改成 x
  let res
  if (value >= 1e9) {
    res = `${(value / 1e9).toFixed(2)}B`
  } else if (value >= 1e6) {
    res = `${(value / 1e6).toFixed(2)}M`
  } else if (value >= 1e3) {
    res = `${(value / 1e3).toFixed(2)}K`
  } else {
    res = `${value.toFixed(2)}`
  }
  return res.replace(/\.00$/, "")
}

export function percent(numerator: number, denominator: number) {
  if (denominator === 0) {
    return "-"
  }
  return `${((numerator / denominator) * 100).toFixed(2)}%`
}

export function formatTime(timestamp: string) {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  if (months > 1) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  } else if (days > 0) {
    return `${days}d`
  } else if (hours > 0) {
    return `${hours}h`
  } else if (minutes > 0) {
    return `${minutes}m`
  } else {
    return `${seconds}s`
  }
}

export function formatAddress(address: string) {
  return address.slice(0, 6) + "..." + address.slice(-4)
}

export function formatString(str: string) {
  if (str.length > 10) {
    return str.slice(0, 5) + "..." + str.slice(-5)
  }
  return str
}
