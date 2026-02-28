import { useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { setApiState, useMainStateManager } from "../mainStateManager"
import Header from "../ui-components/Header"
import { BookCard } from "../ui-components/BookCard"
import { BookCardSkeleton } from "../ui-components/BookCardSkeleton";
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Link } from "react-router-dom"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import { ArrowUpRight, Inbox, ServerCog } from "lucide-react"
import Footer from "@/ui-components/Footer"


export default function Home() {
  const apiState = useMainStateManager((state) => state.apiState);

  const [error,setError] = React.useState(false);

  const [loader,setLoader] = React.useState(true);

  const [dataEmpty,setDataEmpty] = React.useState(false);
  

  if(error) {
    document.body.classList.add("overflow-hidden");
  }

  React.useEffect(()=>{
  fetch("https://json-api.uz/api/project/chizmachilik/materials").then(r=>r.json())
  .then((r)=>{
    setApiState(r['data']);
    setLoader(false);
    if(r['data'].length==0) {
      setDataEmpty(true);
    }
  }).catch(e=>{
    setError(true);
    setLoader(false);
  })
  },[])

  return (

    <>
    <Header/>
    {error&&<div className="fixed inset-0 bg-[#eee] dark:bg-[#1f1f1f] z-[9] flex items-center justify-center flex-col gap-2">
      <ServerCog className="w-30 h-30"/>
      <span className="text-center leading-[120%] text-[18px] font-bold">
        Serverda proflaktika ishlari <br /> olib borilmoqda.
      </span>
    </div>}

    <main className="w-full py-8 px-3">
    <>
    {!dataEmpty&&<div className="max-w-[1440px] mx-auto mt-15">
    <h2 className="font-[550] text-[22px] ml-2 mb-2">Eng Sara yangilari</h2>
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
    <CarouselContent >
    {apiState.length>0?apiState
    ?.filter(el => el.publishedAt > 2020)
    .slice(0, 6)
    .map(el => (
        <CarouselItem key={el.id} className="basis-1/1 sm:basis-1/2 lg:basis-1/3">
        <div className="p-1">
            <Card
            className="bg-cover py-0 overflow-hidden group"
            style={{ backgroundImage: `url(${el.cover})` }}
            >
            <CardContent
                className="flex aspect-square items-start flex-col justify-end p-6 backdrop-blur-[4px] opacity-0 transition-opacity duration-1000 group-hover:opacity-100"
                style={{
                background: "linear-gradient(to bottom, transparent, #0005)"
                }}
            >
                <div className="flex justify-between w-full">
                <div className="flex flex-col gap-1">
                <span className="text-[20px]">
                <Badge className="bg-[#ddd3] dark:text-white dark:bg-[#ddd3]">
                    {el.publishedAt}
                </Badge>
                </span>
                <span className="text-white">
                {el.language} tilida
                </span>
                <span className="text-white">
                {el.resourceType}
                </span>
                </div>
                <div className="h-full flex items-end">
                  <Link to={`/details/${el.id}`} className="text-white flex gap-1 duration-300 transition-opacity hover:opacity-80">Batafsil <ArrowUpRight/></Link>
                </div>
                </div>
            </CardContent>
            </Card>
        </div>
    </CarouselItem>
    )):
    Array.from({length:6})
    .map((_,inx)=>(<CarouselItem key={inx} className="basis-1/1 sm:basis-1/2 lg:basis-1/3">
        <div className="p-1">
            <Card
            className="bg-cover py-0 overflow-hidden"
            >
            
            <CardContent
                className="flex aspect-square px-0"
            >
            <Skeleton className="w-full h-full bg-[#ddd] dark:bg-[#0005]"></Skeleton>
            </CardContent>
            </Card>
        </div>
    </CarouselItem>))
    }
      </CarouselContent>
      <div className="gap-x-5 flex py-10 px-10 w-full flex items-center justify-center">
            <CarouselPrevious className="static cursor-pointer" />
            <CarouselNext className="static cursor-pointer" />
      </div>
    </Carousel>
    </div>}

    {
    !dataEmpty&&
    <div className="max-w-[1440px] w-full mx-auto mt-15">
    <h2 className="font-[550] text-[22px] ml-2 mb-2">Chizmachillikni biz bilan o'rganing</h2>
    </div>}
    <div className="grid max-w-[1440px] w-full gap-8 sm:grid-cols-2 lg:grid-cols-3 mx-auto">
        {
          !loader&&(!dataEmpty && apiState
          .filter(el=>el.cover?true:false)
          .map((el,inx)=>{
            return <BookCard key={el.id??inx} details={el}/>
          })) 
        }
        {loader&&Array.from({length:21}).map((_,inx)=>(<BookCardSkeleton key={inx}/>))}
    </div>
    </>
      <>
      {!loader&&(dataEmpty&&<div className="w-full px-8 pt-6 pb-2 h-[100%] flex items-center flex-1 min-h-[100vh]">
      <div className="mx-auto max-w-[1440px] w-full flex flex-col justify-center items-center">
      <Inbox className="w-25 h-25 text-[#ddd]"/>
      <h2 className="font-bold text-[22px] text-[#ddd]" >
        Kitoblar mavjud emas
      </h2>
      </div>
      </div>)}
      </>
    </main>
    <Footer/>
    </>
  )
}
