import { cn } from "@/lib/utils"
import { getFavicon } from "@/utils"

interface Props {
  size?: number
  className?: string
}

interface IconProps extends Props {
  src: string
}
export default function Icon(props: IconProps) {
  const { src, size = 16, className } = props
  return (
    <div
      className={cn(
        "icon object-cover rounded-[4px]",
        !src && "bg-gray-700",
        className
      )}
      style={{ width: size, height: size }}
    >
      {Boolean(src) && <img src={src} alt={src} className="w-full h-full" />}
    </div>
  )
}

interface FaviconProps extends Props {
  url: string
}
export function Favicon(props: FaviconProps) {
  const { url, size = 16, className } = props
  return <Icon src={getFavicon(url)} size={size} className={className} />
}

export function GmgnIcon(props: Props) {
  const { size = 16, className } = props
  return <Favicon url="gmgn.ai" size={size} className={className} />
}

export function AxiomIcon(props: Props) {
  const { size = 16, className } = props
  return <Favicon url="axiom.trade" size={size} className={className} />
}
