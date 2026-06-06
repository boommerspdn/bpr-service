import Image from "next/image"

import type { EcoGrade, Spec } from "@/lib/types"
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
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Model</TableHead>
            <TableHead className="text-right">BTU</TableHead>
            <TableHead className="hidden text-right md:table-cell">
              SEER
            </TableHead>
            <TableHead className="text-center">
              ฉลาก
            </TableHead>
            <TableHead className="text-right">
              <div className="flex flex-col items-end gap-0.5">
                <span className="md:hidden">ราคา</span>
                <span className="hidden md:inline">ราคาสุทธิรวมติดตั้ง</span>
                <span className="hidden text-xs font-normal text-muted-foreground md:inline">
                  รวมบริการมาตรฐานแล้ว
                </span>
              </div>
            </TableHead>
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
              <TableCell className="hidden text-right tabular-nums md:table-cell">
                {spec.seer ?? "-"}
              </TableCell>
              <TableCell>
                <div className="flex justify-center">
                  <EnergyGradeIcon grade={spec.ecoGrade} />
                </div>
              </TableCell>
              <TableCell className="text-right">
                <span className="font-semibold text-destructive">
                  {formatBaht(spec.price)} บาท
                </span>
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

function EnergyGradeIcon({ grade }: { grade?: EcoGrade | null }) {
  if (!grade) {
    return <span className="text-muted-foreground">-</span>
  }

  const stars = energyStarCount(grade)

  return (
    <Image
      src={`/egat/${stars}.png`}
      alt={`ฉลากประหยัดไฟเบอร์ 5 ${stars} ดาว`}
      width={40}
      height={40}
      className="size-10 object-contain"
    />
  )
}

function energyStarCount(grade: EcoGrade): number {
  return Number(grade.match(/\d(?=star)/)?.[0] ?? 0)
}
