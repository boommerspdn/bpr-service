import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function ProductNotFound() {
  return (
    <main className="container flex flex-col items-center gap-4 py-24 text-center">
      <h1 className="text-2xl font-bold">ไม่พบสินค้านี้</h1>
      <p className="text-muted-foreground">
        สินค้าที่คุณค้นหาอาจถูกลบหรือไม่มีอยู่
      </p>
      <Button asChild>
        <Link href="/">กลับหน้าแรก</Link>
      </Button>
    </main>
  )
}
