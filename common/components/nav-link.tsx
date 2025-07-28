"use client"
import { click, TrackLabel } from "@/utils/track"
import { MoveUpRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import Icon from "./icon"

interface NavLinkProps {
  label: string
  value: string
  icon?: string
  trackLabel: TrackLabel
  className?: string
}

export function NavLink({
  label,
  value,
  icon,
  trackLabel,
  className,
}: NavLinkProps) {
  function onClick() {
    if (trackLabel) {
      click(trackLabel)
    }
  }
  return (
    <Link
      className={cn(
        "data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      href={value}
      onClick={onClick}
    >
      <span className="flex flex-row items-center gap-2 text-md text-gray-200">
        {icon && <Icon src={icon} size={16} />}
        {label}
        <MoveUpRight style={{ width: 12, height: 12 }} className="ml-auto" />
      </span>
    </Link>
  )
}
