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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export default function Header() {

    const [sticky, setSticky] = useState(false);

    window.addEventListener("scroll",()=>{
    if(window.scrollY>600) {    
        setSticky(true);
    } else {
        setSticky(false);
    }
    })

    const [isLight,setIslight] = useState(localStorage.getItem("theme")==="light");

    const [isLogined,setIsLogined] = useState(localStorage.getItem("access__token"));

    useEffect(()=>{
        if(localStorage.getItem("theme")==undefined) {
            setIslight(true)
        }
        if(isLight) {
            document.firstElementChild.classList.remove("dark");
            document.firstElementChild.classList.add("light");
        } else {
            document.firstElementChild.classList.remove("light");
            document.firstElementChild.classList.add("dark");
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

            <div className="hidden md:flex gap-x-4 rounded-full">
                <NavLink to={'/'} className={' [&.active]:bg-[#0002] backdrop-blur-3xl [&.active]:text-black dark:[&.active]:text-white dark:[&.active]:bg-[#ddd2] hover:opacity-70 transition-opacity transition-[text-decoration] duration-300 hover:underline flex gap-2 px-3 py-1.5 rounded-full items-center'}>
                <HomeIcon />
                    Bosh sahifa
                </NavLink>
                <NavLink to={'/dashboard'} className={'[&.active]:bg-[#0002] backdrop-blur-3xl [&.active]:text-black dark:[&.active]:text-white dark:[&.active]:bg-[#ddd2] hover:opacity-70 transition-opacity transition-[text-decoration] duration-300 hover:underline flex gap-2 px-3 py-1.5 rounded-full items-center'}>
                <Settings2/>
                    Boshqaruv paneli
                </NavLink>
            </div>

            <div className="flex md:flex-row-reverse w-full md:w-auto justify-between items-center">

           <div className="md:hidden" >
            <TooltipProvider>
            <DropdownMenu >  
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

                <DropdownMenuContent  className='ml-5 flex flex-col gap-1'>
                <NavLink className="flex items-center gap-x-1 w-full [&.active]:bg-[#0001] rounded-[8px]"  to={'/'}>
                <DropdownMenuItem  className='cursor-pointer w-full' >
                    <HomeIcon />
                    Bosh sahifa
                </DropdownMenuItem>
                </NavLink>
                <NavLink className="flex items-center gap-x-1 w-full [&.active]:bg-[#ddd5] rounded-[5px]"   to={'/dashboard'}>
                <DropdownMenuItem  className='cursor-pointer w-full hover:bg-[#ddd5]' >
                    <Settings2 />
                    Boshqaruv paneli
                </DropdownMenuItem>
                </NavLink>
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
                        <p className="hidden sm:inline-block">Tizimga kirish</p>
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
                    <Button
                        variant="ghost"
                        className="cursor-pointer duration-0 transition-none"
                    >
                        <UserIcon className="!w-5 !h-5 !mb-[0.5px]" />
                        <p className="hidden sm:inline-block">Hisob</p>
                    </Button>
                    </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Hisobni boshqaring</p>
                </TooltipContent>
                </Tooltip>

                <DropdownMenuContent>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                    <DropdownMenuItem
                        variant="destructive"
                        className="cursor-pointer"
                        onSelect={(e) => e.preventDefault()} 
                    >
                        <LogOutIcon className="mr-2 h-4 w-4" />
                        Chiqish
                    </DropdownMenuItem>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                        Rostdan ham chiqmoqchimisiz?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                        Hisobdan chiqganingizdan so‘ng qayta login qilishingiz kerak bo‘ladi.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel className={'cursor-pointer'}>Bekor qilish</AlertDialogCancel>
                        <AlertDialogAction
                        className={`bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 cursor-pointer duration-100`}
                        onClick={() => {
                            localStorage.removeItem("access__token");
                            setIsLogined(false);
                        }}
                        >
                        Chiqish
                        </AlertDialogAction>
                    </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
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
                <p className="hidden sm:inline-block">{isLight?"Tungi":"Kunduzgi"} rejim</p>
            </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Bosangiz {isLight?"tungi":"kunduzgi"} rejimga o'tasiz</p>
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
