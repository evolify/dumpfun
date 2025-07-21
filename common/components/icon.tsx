import { cn } from "@/lib/utils"

interface Props {
  url: string
  size?: number
  className?: string
}
export default function Icon(props: Props) {
  const { url, size = 16, className } = props
  return (
    <div
      className={cn(
        "icon object-cover rounded-[4px]",
        !url && "bg-gray-700",
        className
      )}
      style={{ width: size, height: size }}
    >
      {Boolean(url) && <img src={url} alt={url} className="w-full h-full" />}
    </div>
  )
}
