"use client"
import TokenList from "@/components/token-list"
import { Card, CardContent } from "@/components/ui/card"
import { useTrending } from "@/hooks/api"
import { useDuration } from "@/hooks/duration"

export default function Trending() {
  const { duration, onChange } = useDuration("5m")
  const { data, isLoading, isValidating, error, mutate } = useTrending(duration)

  return (
    <Card>
      <CardContent>
      <TokenList
        title="Trending"
        enableSwitchLayout={false}
        data={data}
        isLoading={isLoading}
        isValidating={isValidating}
        onRefresh={mutate}
        duration={duration}
        onDurationChange={onChange}
      />
      </CardContent>
    </Card>
  )
}
