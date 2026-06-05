import type { Spec } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/star-rating"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function SpecsTable({ specs }: { specs: Spec[] }) {
  if (specs.length === 0) {
    return (
      <p className="py-8 text-center text-muted-foreground">
        ยังไม่มีข้อมูลรุ่นสินค้า
      </p>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Model</TableHead>
            <TableHead className="text-right">BTU</TableHead>
            <TableHead className="text-right">SEER</TableHead>
            <TableHead className="text-center">เบอร์ 5</TableHead>
            <TableHead className="text-center">ดาว</TableHead>
            <TableHead className="text-right">ราคาพร้อมติดตั้ง</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {specs.map((spec) => (
            <TableRow key={spec.id}>
              <TableCell className="font-medium text-primary">
                {spec.model}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {spec.btu != null ? spec.btu.toLocaleString("th-TH") : "-"}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {spec.seer ?? "-"}
              </TableCell>
              <TableCell className="text-center tabular-nums">5</TableCell>
              <TableCell>
                <div className="flex justify-center">
                  <StarRating grade={spec.ecoGrade} />
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex flex-col items-end gap-1">
                  <span className="font-semibold text-destructive">
                    {formatBaht(spec.price)} บาท
                  </span>
                  <Badge variant="destructive" className="font-normal">
                    ฟรีทุกอย่าง
                  </Badge>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function formatBaht(value: number | null | undefined): string {
  if (value == null) return "-"
  return value.toLocaleString("th-TH")
}
