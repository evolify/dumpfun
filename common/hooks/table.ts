import { useEffect, useRef } from "react"

function throttle(fn: (args: any) => void, delay: number) {
  let lastTime = 0
  return (args: any) => {
    const now = Date.now()
    if (now - lastTime > delay) {
      fn(args)
      lastTime = now
    }
  }
}

function cloneHeader(table: HTMLTableElement) {
  if (document.getElementById("fixed-header"))
    return document.getElementById("fixed-header") as HTMLDivElement
  const rect = table.getBoundingClientRect()
  const header = table.querySelector("thead")
  if (!header) return null
  const fixedHeader = document.createElement("div")
  fixedHeader.id = "fixed-header"
  fixedHeader.style.position = "fixed"
  fixedHeader.style.top = "0"
  fixedHeader.style.left = "0"
  fixedHeader.style.right = "0"
  fixedHeader.style.margin = `0 auto`
  fixedHeader.style.zIndex = "100"
  fixedHeader.style.width = `${rect.width}px`
  fixedHeader.style.overflow = "auto"
  fixedHeader.style.display = "none"

  const clonedTable = table.cloneNode(false)
  const clonedHeader = header?.cloneNode(true)
  clonedTable.appendChild(clonedHeader)
  fixedHeader.appendChild(clonedTable)
  document.body.appendChild(fixedHeader)
  syncColumnWidths(table, fixedHeader)
  return fixedHeader
}

function syncColumnWidths(
  table: HTMLTableElement,
  fixedHeader: HTMLDivElement
) {
  const origThs = table.querySelectorAll("thead th")
  const cloneThs = fixedHeader.querySelectorAll("th")
  cloneThs.forEach((th, idx) => {
    const width = window.getComputedStyle(origThs[idx]).width
    th.style.width = width
  })
  fixedHeader.querySelector("table")!.style.width = `${table.offsetWidth}px`
  fixedHeader.style.width = `${table.parentElement?.offsetWidth}px`
}

export function useStickyTable() {
  const tableRef = useRef<HTMLTableElement>(null)
  const fixedHeaderRef = useRef<HTMLDivElement>(null)

  function onScroll() {
    if (!tableRef.current) return
    const table = tableRef.current
    const rect = table.getBoundingClientRect()
    if (rect.top < 0) {
      fixedHeaderRef.current!.style.display = "block"
    } else {
      fixedHeaderRef.current!.style.display = "none"
    }
  }

  function onTableScroll(e: Event) {
    if (!fixedHeaderRef.current) return
    fixedHeaderRef.current.scrollLeft =
      tableRef.current?.parentElement?.scrollLeft ?? 0
  }

  useEffect(() => {
    if (!tableRef.current) return
    const table = tableRef.current
    fixedHeaderRef.current = cloneHeader(table)
    const debouncedOnScroll = throttle(onScroll, 100)
    window.addEventListener("scroll", debouncedOnScroll)
    tableRef.current.parentElement?.addEventListener("scroll", onTableScroll)
    return () => {
      window.removeEventListener("scroll", debouncedOnScroll)
      tableRef.current?.parentElement?.removeEventListener(
        "scroll",
        onTableScroll
      )
    }
  }, [])

  return { tableRef }
}
