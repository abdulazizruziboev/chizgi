import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArrowUpRight , SquarePen } from "lucide-react";

export function BookCard({details,type}) {
  return (
    <>
    <Card className="relative mx-auto w-full pt-0 overflow-hidden h-auto min-h-[395px] pb-4" data-aos='fade-up' >
      <img
        src={details?.cover}
        alt="Xatolik...."
        className={"relative z-20 w-full h-65 object-cover object-top hover:scale-105 transition-transform duration-1000 bg-[#ddd] dark:bg-[#0005]"}
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary" className="duration-0">{details?.publishedAt?details?.publishedAt:"0"}</Badge>
        </CardAction>
        <CardTitle className="leading-[110%]">{details?.title?details?.title:"Noma'lum"}</CardTitle>
        <CardDescription className={'col-span-full'}>
          {details?.summary?details?.summary:"Noma'lum"}
        </CardDescription>
      </CardHeader>
      <CardFooter className="w-full flex items-center justify-end gap-2 lg:ml-auto lg:max-w-[425px] mt-auto flex-wrap xl:flex-nowrap" >
        {type=='dashboard'&&
        <Link to={`/dashboard-crud?id=${details?.id}&action=edit`} className="flex-1 lg:flex-none">
        <Button className="cursor-pointer duration-0 w-full flex-1 lg:flex-none lg:w-auto " variant="outline">
          Tahrirlash <SquarePen/>
        </Button>
        </Link>
        }
        <Link to={type=='dashboard'?`/details/${details?.id}?from=dashboard`:`/details/${details?.id}`} className="flex-1 lg:flex-none">
        <Button className="cursor-pointer duration-0 w-full" variant="outline" >Batafsil ma'lumot <ArrowUpRight/></Button>
        </Link>
      </CardFooter>
    </Card> 

    </>
  )
}
