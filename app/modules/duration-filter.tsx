import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export type Duration = "1d" | "7d" | "30d"

const Durations = ["1d", "7d", "30d"]

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
