import Header from '@/ui-components/Header';
import React, { useEffect , useState} from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { Link, NavLink } from "react-router-dom";
import { ArrowLeft, TriangleAlert, RotateCw ,ServerCog} from 'lucide-react';

import { Skeleton } from "@/components/ui/skeleton"

import { useMainStateManager } from '@/mainStateManager';

export default function Details() {
const [loading,setLoading] = useState(true);

const [detailsApiState,setDetailsApiState] = useState(null);

const [othersApiState,setOthersApiState] = useState(0);

const apiState = useMainStateManager((state) => state.apiState);

const {id} = useParams()
const [searchParams, setSearchParams] = useSearchParams()
const from = searchParams.get("from");

const [error,setError] = React.useState(false);
const [loader,setLoader] = React.useState(false);

useEffect(()=>{
setLoading(true);
fetch(`https://json-api.uz/api/project/chizmachilik/materials/${id}`)
.then(r=>r.text()).then(r=>{
if(r!="Resource not found") {
  let parsedData = JSON.parse(r);
  setDetailsApiState(parsedData);
  setLoading(false);
} else if(r=="Resource not found") {
    setDetailsApiState('404');
    setLoading(false)
}} 
).catch(e=>{
    setError(true);
    setLoader(false);
    });
},[id]);

useEffect(()=>{
if(apiState.length==0) {
fetch("https://json-api.uz/api/project/chizmachilik/materials").then(r=>r.json()).catch(e=>{
    setError(true);
    setLoader(false);
})
.then((r)=>{
    setOthersApiState(r['data']);
}) 
} else {
    setDetailsApiState(apiState);
}
},[])


return (
<>
{error&&<div className="fixed inset-0 bg-[#eee] dark:bg-[#1f1f1f] z-[9] flex items-center justify-center flex-col gap-2">
      <ServerCog className="w-30 h-30"/>
      <span className="text-center leading-[120%] text-[18px] font-bold">
        Serverda proflaktika ishlari <br /> olib borilmoqda.
      </span>
    </div>}
<Header/>
<main className='w-full flex items-center justify-center px-10 py-10 flex-col gap-10'>
<div className='max-w-[1440px] mx-auto w-full'>
    <Link to={from=='dashboard'?'/dashboard':'/'}>
    <Button variant='outline' className={'cursor-pointer scale-105 duration-0'}><ArrowLeft className='!w-5 !h-5'/> Orqaga</Button>
    </Link>
</div>
<div className='flex justify-between w-full flex-col gap-10 xl:flex-row max-w-[1440px]'>
{loading&&<div className='max-w-[1440px] mx-auto w-full flex gap-10 my-auto h-auto mr-auto flex-col lg:flex-row'>
    <div className=''>
        <Skeleton className=' max-w-[450px] lg:max-h-[525px] h-[44vh] lg:h-screen lg:w-screen flex bg-[#eee] dark:bg-[#222]'/>
    </div>
    <div className='py-10 flex flex-col gap-5'>
        <Skeleton className='max-h-[45px] max-w-[450px] !h-screen md:w-screen flex bg-[#eee] dark:bg-[#222]'/>
        <div className='flex flex-col gap-5'>
            <Skeleton className='max-h-[25px] max-w-[450px] !h-screen md:w-screen flex bg-[#eee] dark:bg-[#222]' />
            <Skeleton className='max-h-[25px] max-w-[400px] !h-screen md:w-screen flex bg-[#eee] dark:bg-[#222]'/>
            <Skeleton className='max-h-[25px] max-w-[300px] !h-screen md:w-screen flex bg-[#eee] dark:bg-[#222]'/>
            <Skeleton className='max-h-[25px] max-w-[350px] !h-screen md:w-screen flex bg-[#eee] dark:bg-[#222]'/>
            <Skeleton className='max-h-[25px] max-w-[410px] !h-screen md:w-screen flex bg-[#eee] dark:bg-[#222]'/>
            <Skeleton className='max-h-[25px] max-w-[350px] !h-screen md:w-screen flex bg-[#eee] dark:bg-[#222]'/>
            <div className='flex gap-2 flex-wrap max-w-[400px]'>
                <Skeleton className='max-h-[20px] max-w-[100px] !h-screen md:w-screen flex bg-[#eee] dark:bg-[#222]'/>
                <Skeleton className='max-h-[20px] max-w-[110px] !h-screen md:w-screen flex bg-[#eee] dark:bg-[#222]'/>
                <Skeleton className='max-h-[20px] max-w-[80px] !h-screen md:w-screen flex bg-[#eee] dark:bg-[#222]'/>
                <Skeleton className='max-h-[20px] max-w-[60px] !h-screen md:w-screen flex bg-[#eee] dark:bg-[#222]'/>
                <Skeleton className='max-h-[20px] max-w-[130px] !h-screen md:w-screen flex bg-[#eee] dark:bg-[#222]'/>
                <Skeleton className='max-h-[20px] max-w-[160px] !h-screen md:w-screen flex bg-[#eee] dark:bg-[#222]'/>
                <Skeleton className='max-h-[20px] max-w-[100px] !h-screen md:w-screen flex bg-[#eee] dark:bg-[#222]'/>
            </div>
        </div>
    </div>
</div>}
{!loading&&(
(detailsApiState!='404')?<div className='max-w-[1440px] mx-auto w-full flex gap-10 my-auto flex-col lg:flex-row'>
    <img src={detailsApiState?.cover} alt="" aria-hidden="true" width={450} height={525} className='rounded-[12px] object-cover max-h-[525px] bg-[#eee] dark:bg-[#222]' />
    <div className='md:py-6 flex flex-col gap-2'>
        <h2 className='text-[20px] md:text-[30px] font-bold leading-[111%]'>
            {detailsApiState?.title??"Noma'lum"}
        </h2>
        <p><b className='font-[650]'>- Til: </b>{detailsApiState?.language??"Noma'lum"}</p>
        <p><b className='font-[650]'>- Davlat: </b>{detailsApiState?.country??"Noma'lum"}</p>
        <p><b className='font-[650]'>- Yili: </b>{detailsApiState?.publishedAt??"Noma'lum"}</p>
        <p><b className='font-[650]'>- Turi: </b>{detailsApiState?.resourceType??"Noma'lum"}</p>
        <p><b className='font-[650]'>- Sahifalar: </b>{detailsApiState?.size??"Noma'lum"} bet</p>
        <p className='lg:max-w-[400px]'><b className='font-[650]'>- Muallif(lar): </b>
        {detailsApiState?.authors?
        <>
        {Array.isArray(detailsApiState?.authors)?detailsApiState?.authors?.join(", "):"Noma'lum"}
        </>
        :"Noma'lum"}</p>
        <p className='lg:max-w-[400px]'><b className='font-[650]'>- Tavsif: </b>{detailsApiState?.summary??"Noma'lum"}</p>
        <p className='lg:max-w-[400px] flex gap-2 flex-wrap'><b className='font-[650]'>- Qidiruv so'zlari: </b>
        <div className='flex gap-2 flex-wrap'>
        {
        Array.isArray(detailsApiState?.authors)?
        detailsApiState?.keywords?.map((el,inx)=>{
            return <Badge key={inx}>{el}</Badge>
        })
        :"Noma'lum"
        }
        </div>
        </p>
    </div>
</div>:
<div className='w-full flex justify-center items-center flex-col h-[75vh] gap-3 mr-auto'>
    <div className='flex items-center justify-center flex-col gap-0'>
    <TriangleAlert className="h-30 w-30 " />
    <b>
    Malumotlar topilmadi.
    </b>
    </div>
    <Button variant='outline' onClick={()=>{
setLoading(true)
fetch(`https://json-api.uz/api/project/chizmachilik/materials/${id}`)
.then(r=>r.text()).then(r=>{
if(r!="Resource not found") {
  let parsedData = JSON.parse(r);
  setDetailsApiState(parsedData);
  setLoading(false);
} else if(r=="Resource not found") {
    setDetailsApiState('404');
    setLoading(false)
}} 
)}}
        className={'cursor-pointer'}>
        <RotateCw />
        Qayta urinish
    </Button>
</div>)}
<div>
<h3 className='text-[22px] font-bold'>Tavsiyalar</h3>
<div className='dark:bg-[#ddd1] !w-full xl:max-w-[225px] xl:flex-col !rounded-[16px] xl:rounded-[5px] flex flex-row gap-4 overflow-x-scroll xl:overflow-x-hidden xl:overflow-y-scroll xl:max-h-[500px] px-5 py-4 bg-[#eee] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#0005] dark:[&::-webkit-scrollbar-thumb]:bg-[#fff5] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar]:bg-[#0001] [&::-webkit-scrollbar]:rounded-full xl:px-3 xl:py-2 [&::-webkit-scrollbar-thumb]:bg-[#0005] border-l-10 border-r-10 xl:border-5 xl:border-t-20 xl:border-b-20 dark:border-[#0001] border-[#eee]'>
    
    {
        !othersApiState==0 ?
        othersApiState.map(el=>{
            return <Link to={`/details/${el?.id}`} key={el.id} className={'min-w-40 min-h-50 bg-[#ddd] dark:bg-[#0003] rounded-[12px] bg-no-repeat bg-cover xl:rounded-[5px]'} style={{backgroundImage:`url(${el.cover})`}}>
            </Link>
        })
        :
        Array.from({length:12}).map((el,inx)=>(
            <Skeleton key={inx} className={'min-w-40 min-h-50 bg-[#ddd] dark:bg-[#222]'}></Skeleton>
        ))
    }
</div>
</div>
</div>
</main>
</>
)     
}
