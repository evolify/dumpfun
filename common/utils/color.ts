export function getFdvColor(fdv: number) {
  if (fdv > 5000000) {
    return "text-great"
  } else if (fdv > 1000000) {
    return "text-good"
  } else if (fdv > 200000) {
    return "text-average"
  } else if (fdv > 50000) {
    return "text-early"
  } else {
    return "text-bad"
  }
}

export function getTimeColor(time: string) {
  const diff = Date.now() - new Date(time).getTime()
  const HOUR = 1000 * 60 * 60
  if (diff < HOUR) {
    return "text-great"
  } else if (diff < HOUR * 24) {
    return "text-good"
  } else if (diff < HOUR * 24 * 3) {
    return "text-early"
  } else {
    return "text-average"
  }
}
