import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { EyeOpenIcon } from '@radix-ui/react-icons';
import { EyeOffIcon , LoaderIcon } from 'lucide-react';
import React, { useRef, useState, useEffect} from 'react'
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

export default function Login() {
  let login=useRef(null),
  password=useRef(null);  

  const [passType,setPassType] = useState(false);
  const [reqeustLoad,setReqeustLoad] = useState(false);

  const [isLight,setIslight] = useState(localStorage.getItem("theme")==="light");
  
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

  function handleLogin(e) {
    if(login.current.value.trim()=='') {
      toast.warning('Iltimos login-ni kiriting',{position:'top-center'});
      login.current.focus();
    } else if(password.current.value.trim()=='') {
      toast.warning('Iltimos parol-ni kiriting',{position:'top-center'});
      password.current.focus();
    } else {
      setReqeustLoad(true);
      e.target.disabled=true;
      login.current.disabled=true;
      password.current.disabled=true;
      toast.info('Tizimga kirilmoqda',{position:'top-center'});
      fetch("https://json-api.uz/api/project/chizmachilik/auth/login",
        {
          method:"POST",
          body: JSON.stringify({
            username: login.current.value.trim(),
            password: password.current.value.trim(),
          }),
          headers:{
            'Content-Type':'application/json'
          }
        }
      )
      .then(r=>r.text()).then(r=>{
        if(r=='User not found (check username and password)') {
          setReqeustLoad(false);
          e.target.disabled=false;
          login.current.disabled=false;
          password.current.disabled=false;
          toast.info('Login yoki parol xato',{position:'top-center'});
        } else {
          localStorage.setItem("access__token",JSON.parse(r).access_token);
          window.location.href=window.location.origin+"?from=login";
        }
      })
    }
  }
  return (
    <div className='mx-auto px-10 flex items-center justify-center h-screen'>

      <div className='fixed top-5 right-10'>
      <TooltipProvider>
      <Tooltip>
      <TooltipTrigger asChild>
      <Button variant="ghost" className={`cursor-pointer duration-0`} onClick={()=>{
          isLight?(localStorage.setItem("theme","dark"),setIslight(false)):(localStorage.setItem("theme","light"),setIslight(true));
      }}>
          {isLight?<MoonIcon className="!w-5 !h-5"/>:<SunIcon className="!w-5 !h-5"/>}
          {isLight?"Tungi":"Kunduzgi"}  rejim
      </Button>
      </TooltipTrigger>
      <TooltipContent>
          <p>Bossangiz {isLight?"tungi":"tunduzgi"} rejimga o'tasiz</p>
      </TooltipContent>
      </Tooltip>
      </TooltipProvider>
      </div>
      
      <Toaster />
        <form className='max-w-[420px] w-full flex gap-3 flex-col' onSubmit={(e)=>e.preventDefault()}>
          <div className='flex flex-col'>
          <span><b>chiz</b>gi</span>
          <h2>Tizimga kirish</h2>
          </div>
          <Input placeholder='Logini kiriting' type={'text'} ref={login} ></Input>
          <InputGroup>
          <InputGroupInput placeholder='Parolni kiriting' type={passType?"text":"password"}  ref={password}></InputGroupInput>
          <TooltipProvider>
          <Tooltip>
          <TooltipTrigger asChild>
          <InputGroupAddon align="inline-end" className='cursor-pointer items-center justify-center flex' onClick={()=>{
            if(password.current.type=='password') {
              setPassType(true);
            } else {
              setPassType(false);
            }
          }}>
            {!passType?<EyeOpenIcon/>:<EyeOffIcon />}
          </InputGroupAddon>
          </TooltipTrigger>
          <TooltipContent className={'mr-2'}>
              <p>Bossangiz {passType?"parol ko'rinadi":"parol berkitiladi"}</p>
          </TooltipContent>
          </Tooltip> 
          </TooltipProvider>
        </InputGroup>
          <Button className={'cursor-pointer'} onClick={(e)=>handleLogin(e)}>
            {reqeustLoad?
             <LoaderIcon className="animate-spin" />
            :"Tizimga kirish"}
          </Button>
        </form>

    </div>
  )
}
