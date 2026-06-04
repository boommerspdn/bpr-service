import { Skeleton } from "@/components/ui/skeleton"

export default function ProductDetailLoading() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Skeleton className="mb-6 h-4 w-24" />
      <div className="mx-auto mb-6 h-8 w-72 max-w-full">
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="mx-auto max-w-xl">
        <Skeleton className="aspect-square w-full rounded-2xl" />
      </div>
      <Skeleton className="mt-10 h-72 w-full rounded-xl" />
    </main>
  )
}
