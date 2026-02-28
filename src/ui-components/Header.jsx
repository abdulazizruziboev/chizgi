import { Button } from "../components/ui/button";
import { NativeButton } from "../components/uitripled/native-button-shadcnui";
import { Bars3Icon, MoonIcon, SunIcon , ArrowRightEndOnRectangleIcon} from "@heroicons/react/24/outline";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HomeIcon, LogOutIcon, UserIcon, Settings2 } from "lucide-react";

export default function Header() {

    const [sticky, setSticky] = useState(false);

    window.addEventListener("scroll",()=>{
    if(window.scrollY>600) {    
        setSticky(true);
    } else {
        setSticky(false);
    }
    })

    const [isLight,setIslight] = useState(localStorage.getItem("theme")==="light"||localStorage.getItem("theme")===undefined);

    const [isLogined,setIsLogined] = useState(localStorage.getItem("access__token"));

    useEffect(()=>{
        if(!isLight) {
            document.body.classList.remove("dark");
            document.body.classList.add("light");
        } else {
            document.body.classList.remove("light");
            document.body.classList.add("dark");
        }
    },[isLight])
    
    return (

    <>

    <header className={`bg-[#fff] min-h-[60px] border-b-1 flex items-center justify-center px-5 dark:bg-[#1F1F1F] border-[#ddd5] dark:border-[#ddd2] top-0 ${sticky?"sticky":"static"} z-10`}>
        <div className="max-w-[1440px] flex items-center justify-between w-full flex-wrap">            

            <a href="/" className="flex hover:opacity-[80%] transition-opacity duration-500 hidden md:inline-block">
                <span className="font-bold">
                    chiz
                </span>
                <span>
                    gi
                </span>
            </a>

            <div className="hidden md:flex gap-x-4">
                <NavLink to={'/'} className={'[&.active]:underline underline-offset-4 hover:opacity-70 transition-opacity transition-[text-decoration] duration-300 hover:underline'}>
                    Bosh sahifa
                </NavLink>
                <NavLink to={'/dashboard'} className={'[&.active]:underline underline-offset-4 hover:opacity-70 transition-opacity transition-[text-decoration] duration-300 hover:underline'}>
                    Boshqaruv paneli
                </NavLink>
            </div>

            <div className="flex md:flex-row-reverse w-full md:w-auto justify-between items-center">

           <div className="md:hidden">
            <TooltipProvider>
            <DropdownMenu>
                <Tooltip>
                <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="cursor-pointer duration-0">
                        <Bars3Icon className="!w-[20px] !h-[20px]" />
                    </Button>
                    </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Menyu</p>
                </TooltipContent>
                </Tooltip>

                <DropdownMenuContent>
                <DropdownMenuItem  className='cursor-pointer' >
                    <Link className="flex items-center gap-x-1" to={'/'}>
                    <HomeIcon />
                    Bosh sahifa
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem >
                    <Link className="flex items-center gap-x-1" to={'/dashboard'}>
                    <Settings2 />
                    Boshqaruv paneli
                    </Link>
                </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </TooltipProvider>
           </div>

            
            <a href="/" className="flex hover:opacity-[80%] transition-opacity duration-500 md:hidden">
                <span className="font-bold">
                    chiz
                </span>
                <span>
                    gi
                </span>
            </a>

            <div className="flex md:flex-row-reverse">
            {
            !isLogined?
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                    <Link to={"/login"}>
                    <Button variant="ghost" className="cursor-pointer duration-0">
                        <ArrowRightEndOnRectangleIcon className="!w-[20px] !h-[20px]" />
                    </Button>
                    </Link>
                    </TooltipTrigger>
                <TooltipContent>
                    <p>Tizimga kirish</p>
                </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            :
            <TooltipProvider>
            <DropdownMenu>
                <Tooltip>
                <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="cursor-pointer duration-0 transition-none">
                        <UserIcon className="!w-5 !h-5 !mb-[0.5px]" />
                    </Button>
                    </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Hisob</p>
                </TooltipContent>
                </Tooltip>

                <DropdownMenuContent>
                <DropdownMenuItem variant="destructive" className='cursor-pointer' onClick={()=>{
                    localStorage.removeItem("access__token");
                    setIsLogined(false);
                }}>
                    <LogOutIcon />
                    Chiqish
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </TooltipProvider>
            }
            <TooltipProvider>
            <Tooltip>
            <TooltipTrigger asChild>
            <Button variant="ghost" className={`cursor-pointer duration-0`} onClick={()=>{
                isLight?(localStorage.setItem("theme","dark"),setIslight(false)):(localStorage.setItem("theme","light"),setIslight(true));
            }}>
                {isLight?<MoonIcon className="!w-5 !h-5"/>:<SunIcon className="!w-5 !h-5"/>}
            </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>{isLight?"Tungi":"Kunduzgi"} rejim</p>
            </TooltipContent>
            </Tooltip>
            </TooltipProvider>
            </div>
            </div>

        </div>
    </header>
    </>
  )
}
