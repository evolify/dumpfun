import { Badge } from "@/components/ui/badge"
import { useNarrative } from "@/hooks/api"
import { PoolInfo } from "@/types"
import { getKlineLink } from "@/utils"

interface Props {
  data: PoolInfo
}

export default function Info({ data }: Props) {
  const { baseAsset } = data
  const narrative = useNarrative(data.baseAsset.id)
  return (
    <div className="flex flex-col h-full">
      <div className="h-0 flex-1 relative overflow-hidden">
        <iframe
          src={getKlineLink(baseAsset.id)}
          width="100%"
          className="border-none h-[calc(100%+36px)]"
        />
      </div>

      <div className="px-4 py-2 flex flex-col gap-2">
        <div>
          <Badge variant="secondary" className="">
            DevTokens {baseAsset.audit.devMigrations}
          </Badge>
          <Badge variant="secondary">
            TopHold {baseAsset.audit.topHoldersPercentage.toFixed(2)}%
          </Badge>
        </div>
        {narrative && (
          <div className="text-sm leading-4.5 line-clamp-3 text-gray-200">
            {narrative}
          </div>
        )}
      </div>
    </div>
  )
}
