import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Durations } from "@/hooks/duration"
import type { Duration } from "@/types"

interface Props {
  value: Duration
  onChange: (value: Duration) => void
}

export default function Filter({ value, onChange }: Props) {
  return (
    <ToggleGroup
      variant="outline"
      type="single"
      value={value}
      onValueChange={onChange}
    >
      {Durations.map(option => (
        <ToggleGroupItem key={option} value={option}>
          {option}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
