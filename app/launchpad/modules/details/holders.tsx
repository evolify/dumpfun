import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useHolders } from "@/hooks/api"
import { Holder } from "@/types"
import { formatAddress, formatNumber } from "@/utils/format"
import clsx from "clsx"

interface Props {
  address: string
  supply: number
}

function renderAddress(holder: Holder) {
  if (!holder.tags) {
    return formatAddress(holder.address)
  }
  const { id, name } = holder.tags[0]
  return (
    <div className="flex flex-row items-center gap-1">
      <div>{formatAddress(name)}</div>
      <Badge
        variant="outline"
        className={clsx(
          "ml-2 py-0",
          id === "CEX"
            ? "text-amber-500 border-amber-500"
            : "text-blue-500 border-blue-500"
        )}
      >
        {id}
      </Badge>
    </div>
  )
}

export default function Holders({ address, supply }: Props) {
  const { holders } = useHolders(address)
  return (
    <Table className="w-full overflow-y-auto overscroll-none">
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Sol Balance</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {holders.map((t, index) => (
          <TableRow key={t.address}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{renderAddress(t)}</TableCell>
            <TableCell>
              {formatNumber(t.amount)} /{" "}
              {((t.amount / supply) * 100).toFixed(2)} %
            </TableCell>
            <TableCell>
              {formatNumber(Number(t.solBalance) / 10 ** 9)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
