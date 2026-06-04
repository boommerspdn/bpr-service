import type { Brand, EcoGrade, UnitType } from "@/lib/types"

/** Product detail subtitle label per unit type. */
export const UNIT_TYPE_LABEL: Record<UnitType, string> = {
  wall_unit: "แอร์ติดผนัง",
  floor_unit: "แอร์ตั้งพื้น",
  ceiling_cassette: "แอร์ฝังฝ้า (Cassette)",
  hanging_unit: "แอร์แขวน",
}

/** Number of filled stars (out of 5) for each eco grade. */
export const ECO_GRADE_STARS: Record<EcoGrade, number> = {
  "5_5stars": 5,
  "5_4stars": 4,
  "5_3stars": 3,
  "5_2stars": 2,
  "5_1star": 1,
}

/** The four service types shown on brand cards (conditionally by brand flags). */
export const SERVICE_TYPES: {
  key: UnitType
  label: string
  icon: string
}[] = [
  {
    key: "wall_unit",
    label: "แอร์ติดผนัง (Wall Type)",
    icon: "/types/Wall.png",
  },
  {
    key: "floor_unit",
    label: "แอร์ตั้งพื้น (Floor Type)",
    icon: "/types/floor.png",
  },
  {
    key: "ceiling_cassette",
    label: "แอร์ฝังฝ้า (Cassette)",
    icon: "/types/ceiling.png",
  },
  {
    key: "hanging_unit",
    label: "แอร์แขวน (Hanging Type)",
    icon: "/types/cassette.png",
  },
]

export const BRAND_UNIT_TYPE_FLAGS: Record<UnitType, keyof Brand> = {
  wall_unit: "wallUnit",
  floor_unit: "floorUnit",
  ceiling_cassette: "ceilingCassette",
  hanging_unit: "hangingUnit",
}

export function getActiveServiceTypes(brand: Brand) {
  return SERVICE_TYPES.filter(
    ({ key }) => brand[BRAND_UNIT_TYPE_FLAGS[key]] === true
  )
}

/** Top navigation items. Non-home routes are placeholder pages for now. */
export const NAV_ITEMS: { label: string; href: string }[] = [
  { label: "หน้าแรก", href: "/" },
  { label: "ผลงานของเรา", href: "/works" },
  { label: "ติดต่อเรา", href: "/contact" },
  { label: "เกี่ยวกับเรา", href: "/about" },
]

/** Format a number as Thai Baht, e.g. 19900 -> "19,900". */
export function formatBaht(value: number | null | undefined): string {
  if (value == null) return "-"
  return value.toLocaleString("th-TH")
}
