import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function BookCardSkeleton() {
  return (
    <Card className="w-full pt-0 overflow-hidden" data-aos='fade-up'>
    <CardContent className="px-0 ">
        <Skeleton className="aspect-video w-full bg-[#eee] dark:bg-[#000] h-65 rounded-[0px]" />
    </CardContent>
      <CardHeader>
        <Skeleton className="h-7 w-3/3 bg-[#eee] dark:bg-[#000]" />
        <Skeleton className="h-4 w-3/3 bg-[#eee] dark:bg-[#000]" />
        <Skeleton className="h-4 w-3/3 bg-[#eee] dark:bg-[#000]" />
      </CardHeader>
    <CardContent >
        <Skeleton className="aspect-video w-full bg-[#eee] dark:bg-[#000] h-[36px]" />
    </CardContent>
    </Card>
  )
}
