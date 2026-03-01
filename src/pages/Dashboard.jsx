import { BookCard } from "@/ui-components/BookCard";
import Header from "@/ui-components/Header";
import {BookCardSkeleton} from "@/ui-components/BookCardSkeleton";
import { setApiState, useMainStateManager } from "@/mainStateManager";
import Footer from "@/ui-components/Footer";
import { Plus , Inbox , ServerCog} from "lucide-react";
import {Link} from "react-router-dom";
import { Button } from "@/components/ui/button";
import * as React from "react";

export default function Dashboard() {

  if(localStorage.getItem("access__token")==null) {
    window.location.href=window.location.origin+'/login';
  }
  
  const apiState = useMainStateManager((state) => state.apiState);
  const [error,setError] = React.useState(false);
  const [loader,setLoader] = React.useState(false);
  const [dataEmpty,setDataEmpty] = React.useState(false);

    React.useEffect(()=>{
    if(apiState.length==0) {
    setLoader(true);
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
    <main className="w-full px-3 py-5">
        <div className="flex max-w-[1440px] pb-5 items-center w-full mx-auto justify-end">
            <Link to={'/dashboard-crud?action=add'} className="">
            <Button variant="outline" className={'cursor-pointer duration-0'}>
                <Plus/> Yangi kitob
            </Button>
            </Link>
        </div>
        <div className="grid max-w-[1440px] w-full gap-8 sm:grid-cols-2 lg:grid-cols-3 mx-auto">
        {
        apiState.length > 0 && <>
        {apiState
        .filter(el=>el.cover?true:false)
        .map((el,inx)=>{
        return <BookCard key={el.id??inx} details={el} type={'dashboard'}/>
        })}
        </>}          
        {loader&&Array.from({length:21}).map((_,inx)=>(<BookCardSkeleton key={inx}/>))}
        </div>
        {!loader&&(dataEmpty&&<div className="w-full px-8 pt-6 pb-2 h-[100%] flex items-center flex-1 min-h-[100vh]">
        <div className="mx-auto max-w-[1440px] w-full flex flex-col justify-center items-center">
        <Inbox className="w-25 h-25 text-[#ddd]"/>
        <h2 className="font-bold text-[22px] text-[#ddd]" >
            Kitoblar mavjud emas
        </h2>
        </div>
        </div>)}
    </main>
    <Footer/>
    </>
  )
}
