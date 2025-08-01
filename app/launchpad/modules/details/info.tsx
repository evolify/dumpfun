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

      <div className="py-4 flex flex-col gap-1">
        <div>
          <Badge variant="secondary" className="">
            DevTokens {baseAsset.audit.devMigrations}
          </Badge>
          <Badge variant="secondary">
            TopHold {baseAsset.audit.topHoldersPercentage.toFixed(2)}%
          </Badge>
        </div>
        {narrative && (
          <div className="text-sm text-gray-200 mt-2">{narrative}</div>
        )}
      </div>
    </div>
  )
}
