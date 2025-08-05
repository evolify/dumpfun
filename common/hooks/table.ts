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
  if (document.getElementById("fixed-header")) {
    return [
      document.getElementById("fixed-header-wrapper") as HTMLDivElement,
      document.getElementById("fixed-header") as HTMLDivElement,
    ]
  }
  const rect = table.getBoundingClientRect()
  const header = table.querySelector("thead")
  if (!header) return []
  const wrapper = document.createElement("div")
  const fixedHeader = document.createElement("div")
  wrapper.id = "fixed-header-wrapper"
  fixedHeader.id = "fixed-header"
  wrapper.style.backgroundColor = "var(--background)"
  wrapper.style.position = "fixed"
  wrapper.style.top = "0"
  wrapper.style.left = "0"
  wrapper.style.right = "0"
  wrapper.style.zIndex = "100"
  wrapper.style.width = "100vw"
  wrapper.style.display = "none"
  fixedHeader.style.margin = "0 auto"
  fixedHeader.style.width = `${rect.width}px`
  fixedHeader.style.overflow = "hidden"

  const clonedTable = table.cloneNode(false)
  const clonedHeader = header?.cloneNode(true)
  clonedTable.appendChild(clonedHeader)
  fixedHeader.appendChild(clonedTable)
  wrapper.appendChild(fixedHeader)
  document.body.appendChild(wrapper)
  syncColumnWidths(table, fixedHeader)
  return [wrapper, fixedHeader]
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
  const wrapperRef = useRef<HTMLDivElement>(null)

  function onScroll() {
    if (!tableRef.current) return
    const table = tableRef.current
    const rect = table.getBoundingClientRect()
    if (rect.top < 0) {
      wrapperRef.current!.style.display = "block"
    } else {
      wrapperRef.current!.style.display = "none"
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
    const [wrapper, fixedHeader] = cloneHeader(table)
    fixedHeaderRef.current = fixedHeader
    wrapperRef.current = wrapper
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
