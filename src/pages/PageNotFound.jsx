import Header from "@/ui-components/Header"
import {CircleSlash, House} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
export default function PageNotFound() {
  return (
    <div>
        <Header/>
        <div className="flex items-center justify-center h-[90vh] flex-col gap-3">
            <div className="flex items-center justify-center flex-col">
                <h1 className="flex items-center justify-center text-[80px] leading-none">
                    4
                    <CircleSlash className="w-20 h-20"/>
                    4
                </h1>
                <b>SAHIFA MAVJUD EMAS</b>
            </div>
            <Link to="/">
            <Button variant='outline' className="cursor-pointer duration-0">
                <House/>
                Bosh sahifaga qaytish
            </Button>
            </Link>
        </div>
    </div>
  )
}
