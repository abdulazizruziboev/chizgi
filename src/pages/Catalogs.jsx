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
import { ArrowUpRight, Inbox, ServerCog , Search, Funnel, FunnelX} from "lucide-react"
import Footer from "@/ui-components/Footer"
import { Toaster , toast} from "sonner"
import {useSearchParams} from "react-router-dom"
import BottomNavigationPanel from "@/ui-components/BottomNavigationPanel"
import { Kbd } from "@/components/ui/kbd"
import { Button } from "@/components/ui/button"


import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Input } from "@/components/ui/input"

export default function Catalogs() {
  const apiState = useMainStateManager((state) => state.apiState);

  const [error,setError] = React.useState(false);

  const [loader,setLoader] = React.useState(true);

  const [dataEmpty,setDataEmpty] = React.useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const [filteredBooksState,setFilteredBooksState] = React.useState([]);

  const [filterMenuStatus,setFilterMenuStatus]=React.useState(false);

  
  if(error) {
      document.body.classList.add("overflow-hidden");
    }

  React.useEffect(()=>{
  if(apiState.length==0){
   fetch("https://json-api.uz/api/project/chizmachilik/materials").then(r=>r.json())
  .then((r)=>{
    setApiState(r['data']);
    setLoader(false);
    const filteredBooks = r.data.filter(el => {
    return el.publishedAt>=(Number(searchParams.get("yearFrom")) || 0)
    && el.publishedAt<=(Number(searchParams.get("yearTo")) || new Date().getFullYear())
    && el.size>=(Number(searchParams.get("pageFrom")) || 0)
    && el.size<=(Number(searchParams.get("pageTo")) || 3000);
    });
    setFilteredBooksState(filteredBooks);
    if(r['data'].length==0) {
      setDataEmpty(true);
    }
  }).catch(e=>{
    console.log(e);
    setError(true);
    setLoader(false);
  })} else {
    setLoader(false);
    const filteredBooks = apiState.filter(el => {
    return el.publishedAt>=(Number(searchParams.get("yearFrom")) || 0)
    && el.publishedAt<=(Number(searchParams.get("yearTo")) || new Date().getFullYear())
    && el.size>=(Number(searchParams.get("pageFrom")) || 0)
    && el.size<=(Number(searchParams.get("pageTo")) || 3000);
    });
    setFilteredBooksState(filteredBooks);
    setLoader(false);
    if(apiState.length==0) {
      setDataEmpty(true);
    }
  }
  },[searchParams,apiState])


  return (

    <>
    <Header/>
    {error&&<div className="fixed inset-0 bg-[#eee] dark:bg-[#1f1f1f] z-[9] flex items-center justify-center flex-col gap-2">
      <ServerCog className="w-30 h-30"/>
      <span className="text-center leading-[120%] text-[18px] font-bold">
        Serverda proflaktika ishlari <br /> olib borilmoqda.
      </span>
    </div>}

    <main className="w-full py-8 px-3 mb-[65px] lg:mb-0">
    <>
    <div className="max-w-[1440px] w-full mx-auto mt-10 gap-3 flex flex-col">
    <h2 className="font-[550] text-[22px] ml-2">O'zingizga mosini izlang</h2>
    <div className="flex gap-2 w-full justify-between items-center"> 
        <form onSubmit={(evt)=>{
            evt.preventDefault();
            const seachFormData = new FormData(evt.target);
            if(seachFormData.get("search").trim()!="") {
                
                const result = apiState.filter(el =>
                    el?.title?.toLowerCase().includes(seachFormData.get("search").trim().toLowerCase())
                );
                setFilteredBooksState(result);
            } else if(seachFormData.get("search").trim()=="") {
                setFilteredBooksState(apiState);
            }
        }}>
            <InputGroup className="max-w-xs">
            <InputGroupInput placeholder="Qidirish..." name="search" />
            <InputGroupAddon>
                <Search />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
            <Kbd className={'px-3 border-1 border-[#ddd] dark:border-[#ddd5]'}>Enter</Kbd>
            </InputGroupAddon>
            </InputGroup>
        </form>
        <Button variant="outline" onClick={()=>setFilterMenuStatus(!filterMenuStatus)} className={'duration-0 cursor-pointer'}>
            <Funnel/> Saralash
        </Button>
    </div>
    {filterMenuStatus&&<form className="border-1 px-4 py-3 rounded-[12px] flex flex-col gap-2"
    onSubmit={(e)=>{
        e.preventDefault();
        let filterFormData = new FormData(e.target);
        setSearchParams({
        yearFrom: filterFormData.get("yearFrom")?Number(filterFormData.get("yearFrom")):0,
        yearTo: filterFormData.get("yearTo")?Number(filterFormData.get("yearTo")):new Date().getFullYear(),
        pageFrom: filterFormData.get("pageFrom")?Number(filterFormData.get("pageFrom")):0,
        pageTo: filterFormData.get("pageTo")?Number(filterFormData.get("pageTo")):2000
        })            
    }}
    >
        <div className="flex">
        <div className="flex gap-[6px] items-center leading-[100%] relative left-[-2px]">
            &nbsp;Yil:
            <Input defaultValue={searchParams.get("yearFrom")?Number(searchParams.get("yearFrom")):0} placeholder="1980" className={'h-[30px]'} name="yearFrom"/>
            &nbsp;dan
            <Input defaultValue={searchParams.get("yearTo")?Number(searchParams.get("yearTo")):new Date().getFullYear()} placeholder="1980" className={'h-[30px]'} name="yearTo"/> 
            &nbsp;gacha
        </div>
        <hr className="rotate-90 w-10 h-1 my-auto"/>
        <div className="flex gap-[6px] items-center max-w-[] leading-[100%]" >
            &nbsp;Sahifalar:
            <Input defaultValue={searchParams.get("pageFrom")?Number(searchParams.get("pageFrom")):0} placeholder="10" className={'h-[30px]'} name="pageFrom"/>
            &nbsp;dan
            <Input defaultValue={searchParams.get("pageTo")?Number(searchParams.get("pageTo")):2000} placeholder="1000" className={'h-[30px]'} name="pageTo"/> 
            &nbsp;gacha
        </div>
        </div>
        <hr className="mx-10"/>
        <div className="w-full grid grid-cols-2 gap-3">
        <Button type='reset' className={'w-full duration-0'} variant="outline" onClick={() => setSearchParams({})}>
            <FunnelX/>
            Tiklash
        </Button>
        <Button className={'w-full duration-0'} variant="outline">
            <Funnel/>
            Saralansin
        </Button>
        </div>
    </form>}
    </div>
    {
    !dataEmpty&&
    <div className="max-w-[1440px] w-full mx-auto mt-15">
    </div>}
    <div className="grid max-w-[1440px] w-full gap-8 sm:grid-cols-2 lg:grid-cols-3 mx-auto">
        {
          !loader&&(!dataEmpty && <>
          {filteredBooksState.length>0?filteredBooksState
          .filter(el=>el.cover?true:false)
          .map((el,inx)=>{
            return <BookCard key={el.id??inx} details={el} from={'catalogs'}/>
          }):<div className="w-full px-8 pt-6 pb-2 h-[100%] flex items-center flex-1 min-h-[60vh] col-span-full">
            <div className="mx-auto max-w-[1440px] w-full flex flex-col justify-center items-center">
            <Inbox className="w-25 h-25 text-[#ddd]"/>
            <h2 className="font-bold text-[22px] text-[#ddd]" >
                Kitoblar topilmadi
            </h2>
            </div>
            </div>}
          </>) 
        }
        {loader&&Array.from({length:21}).map((_,inx)=>(<BookCardSkeleton key={inx}/>))}
    </div>
    </>
      <>
      {!loader&&(dataEmpty&&<div className="w-full px-8 pt-6 pb-2 h-[100%] flex items-center flex-1 min-h-[65vh]">
      <div className="mx-auto max-w-[1440px] w-full flex flex-col justify-center items-center">
      <Inbox className="w-25 h-25 text-[#ddd]"/>
      <h2 className="font-bold text-[22px] text-[#ddd]" >
        Kitoblar mavjud emas
      </h2>
      </div>
      </div>)}
      </>
    </main>
    <div className="hidden lg:inline-block w-full">
      <Footer/>
    </div>
    <BottomNavigationPanel/>
    </>
  )
}
