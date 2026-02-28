import { BookCard } from "@/ui-components/BookCard";
import Header from "@/ui-components/Header";
import {BookCardSkeleton} from "@/ui-components/BookCardSkeleton";
import { useMainStateManager } from "@/mainStateManager";
import Footer from "@/ui-components/Footer";
import { Plus } from "lucide-react";
import {Link} from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const apiState = useMainStateManager((state) => state.apiState);
  return (
    <>
    <Header/>
    <main className="w-full px-3 py-5">
        <div className="flex max-w-[1440px] pb-5 items-center w-full mx-auto justify-end">
            <Link to={'/dashboard-crud?action=add'} className="">
            <Button variant="outline" className={'cursor-pointer'}>
                <Plus/> Yangi kitob
            </Button>
            </Link>
        </div>
        <div className="grid max-w-[1440px] w-full gap-8 sm:grid-cols-2 lg:grid-cols-3 mx-auto">
                {
                  apiState.length>0 ? apiState
                  .filter(el=>el.cover?true:false)
                  .map((el,inx)=>{
                    return <BookCard key={el.id??inx} details={el} type={'dashboard'}/>
                  }) : Array.from({length:21}).map((_,inx)=>(<BookCardSkeleton key={inx}/>))
                }
        </div>
    </main>
    <Footer/>
    </>
  )
}
