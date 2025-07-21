import { useSearchParams } from "next/navigation"

export function useQuery(key: string) {
  const p = useSearchParams()
  return p.get(key)
}
