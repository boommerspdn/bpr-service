import { Star } from "lucide-react"

import type { EcoGrade } from "@/lib/types"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  /** Eco grade enum from a spec; takes precedence over `value`. */
  grade?: EcoGrade | null
  /** Explicit filled-star count (0–5) if no grade is supplied. */
  value?: number
  total?: number
  className?: string
}

export function StarRating({
  grade,
  value,
  total = 5,
  className,
}: StarRatingProps) {
  const filled = grade ? ECO_GRADE_STARS[grade] : (value ?? 0)
  const label = `${filled} จาก ${total} ดาว`

  return (
    <div
      className={cn("inline-flex items-center gap-0.5", className)}
      role="img"
      aria-label={label}
    >
      {Array.from({ length: total }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          className={cn(
            "size-4",
            i < filled
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted-foreground/40"
          )}
        />
      ))}
    </div>
  )
}

const ECO_GRADE_STARS: Record<EcoGrade, number> = {
  "5_5stars": 5,
  "5_4stars": 4,
  "5_3stars": 3,
  "5_2stars": 2,
  "5_1star": 1,
}
