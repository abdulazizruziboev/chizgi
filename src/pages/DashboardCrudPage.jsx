import Footer from '@/ui-components/Footer'
import Header from '@/ui-components/Header'
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';
import { setApiState, useMainStateManager } from '@/mainStateManager';
import { Toaster,toast } from 'sonner';
import { Loader } from 'lucide-react';

export default function DashboardCrudPage() {


  const [searchParams, setSearchParams] = useSearchParams();
  const action = searchParams.get("action");
  const id = searchParams.get("id");
  const [editFillData,setEditFillData]=useState({});
  const apiState = useMainStateManager((state) => state.apiState);
  const [requestLoading,setReqeustLoading] = useState(false);

  useEffect(()=>{
  if(action=="edit") {
    toast.info("So'rov yuborilmoqda. Iltimos biroz kuting",{position:"top-center"});
  if(id!=null) {
    if(apiState.length>0) {
    let founded = apiState.filter(el=>{
        if(el.id==id) {
          return true;
        }
      })
    
    toast.info("Ma'lumotlar to'ldirildi. Tahrirlashingiz mumkin",{position:"top-center"});
    setEditFillData(founded[0]);
    } else {
      fetch(`https://json-api.uz/api/project/chizmachilik/materials/${id}`)
      .then(r=>r.text()).then(r=>{
      if(r!="Resource not found") {
        let parsedData = JSON.parse(r);
        setEditFillData(parsedData);
        toast.info("Ma'lumotlar to'ldirildi. Tahrirlashingiz mumkin",{position:"top-center"});
      } else if(r=="Resource not found") {
        toast.error("Bunday resurs mavjud emas.",{position:"top-center"})
      }})
    }
  }}
  },[id])

  function handleForm(e) {
    e.preventDefault();
    let emptyInputs = [];
    e.target.querySelectorAll("input,textarea").forEach(el => {
      if(el.value.trim()==''||0) {
        emptyInputs.push(el.ariaLabel.toLowerCase());
      }
    });
    
    if(emptyInputs.length==0) {
      
      let reqeustData = {};
      let _form = new FormData(e.target)
      
      _form.forEach((v,k)=>{
        reqeustData[k]=v;
        if(k=="authors"||k=="keywords") {
          reqeustData[k]=v.split(",");
        }
      });

      setReqeustLoading(true)
      
      toast.info("So'rov jo'natilmoqda",{position:'top-center'});
      
      if(action=="edit") {
        fetch(`https://json-api.uz/api/project/chizmachilik/materials/${id}`,{
          method:"PATCH",
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + localStorage.getItem("access__token")
          }, body:JSON.stringify(reqeustData)        
        })
        .then(r=>r.text()).then(r=>{
          
          if(r=="Resource not found") {
            toast.error("Bunday resurs mavjud emas",{position:'top-center'});
            setReqeustLoading(false);
          } else if(r=="Token expired!") {
            localStorage.removeItem("access__token");
            window.location.href= window.location.origin+"/login";
          } else {
            let parsedData = JSON.parse(r);
            let newData = apiState.map(el=>{
              if(el.id==parsedData.id) return parsedData;
              else return el;
            })
            setApiState(newData);
            
            toast.info("Muvaffaqiyatli. Ma'lumotlar o'zgartirildi",{position:'top-center'});
            setReqeustLoading(false);
            window
            setTimeout(() => {            
              window.location.href= window.location.origin+"/dashboard"
            }, 1200);
          }
        }).catch(err=>{
          console.log(err);
          toast.error("Xatolik yuz berdi. Keyinroq qayta urining",{position:'top-center'});
          setReqeustLoading(false);
        })
      } else if (action=="add") {
        fetch(`https://json-api.uz/api/project/chizmachilik/materials`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + localStorage.getItem("access__token")
          }, body:JSON.stringify(reqeustData)        
        }).then(r=>r.text()).then(r=>{
          if(r=="Token expired!") {
            localStorage.removeItem("access__token");
            window.location.href= window.location.origin+"/login";
          } else {
            let parsedData = JSON.parse(r);
            let newData = apiState.push(parsedData);
            setApiState(newData);
            
            toast.info("Muvaffaqiyatli. Ma'lumotlar qo'shildi",{position:'top-center'});
            setReqeustLoading(false);
            setTimeout(() => {            
              window.location.href= window.location.origin+"/dashboard"
            }, 1200);
          }
        }).catch(err=>{
          console.log(err);
          toast.error("Xatolik yuz berdi. Keyinroq qayta urining",{position:'top-center'});
          setReqeustLoading(false);
        })
      }

    } else {
      toast.info(`Iltimos ${emptyInputs[0].replaceAll("_"," ")}-ni to'ldiring`,{position:'top-center'})
      e.target.querySelector(`[aria-label="${emptyInputs[0]}"]`).focus();
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
    <Header/>
    <main className='w-full px-8 pt-6 pb-2 h-[100%] flex items-center flex-1'>
      <form className='mx-auto max-w-[1440px] w-full grid gap-3 lg:grid-cols-2' onSubmit={(e)=>handleForm(e)}>
        <h2 className='text-[22px] font-[550] col-span-full w-full'>
          {action=='edit'?'Tahrirlash':'Yangi Kitob'}
        </h2>
        <hr className='col-span-full mx-4'/>
        <Field className={'gap-1 lg:col-span-1'}>
         <FieldLabel htmlFor="title">Sarlavha</FieldLabel>
         <Input disabled={requestLoading==true?true:false} defaultValue={editFillData?.title} id="title" name='title' type="text" placeholder="Masalan: Chizmachilik" aria-label="sarlavha" />
        </Field>
        <Field className={'gap-1 lg:col-span-1'}>
         <FieldLabel htmlFor="resourceType" >Turi</FieldLabel>
         <Input disabled={requestLoading==true?true:false} defaultValue={editFillData?.resourceType} id="resourceType" name='resourceType' type="text" placeholder="Masalan: O'quv qo'llanma" aria-label="turi" />
        </Field>
        <Field className={'gap-1 lg:col-span-1'}>
         <FieldLabel htmlFor="language">Tili</FieldLabel>
         <Input disabled={requestLoading==true?true:false} defaultValue={editFillData?.language} id="language" aria-label="tili" name='language' type="text" placeholder="Masalan: O'zbek" />
        </Field>
        <Field className={'gap-1 lg:col-span-1'}>
         <FieldLabel htmlFor="country">Davlat</FieldLabel>
         <Input disabled={requestLoading==true?true:false} defaultValue={editFillData?.country} id="country" aria-label="davlat" name='country' type="text" placeholder="Masalan: O'zbekiston" />
        </Field>
        <Field className={'gap-1 lg:col-span-1'}>
         <FieldLabel htmlFor="publishedAt">Yili</FieldLabel>
         <Input disabled={requestLoading==true?true:false} defaultValue={editFillData?.publishedAt} id="publishedAt" name="publishedAt" type="number" max={new Date().getFullYear()} placeholder="Masalan: 2000" aria-label="yili" />
        </Field>
        <Field className={'gap-1 lg:col-span-1'}>
         <FieldLabel htmlFor="size">Sahifalar soni</FieldLabel>
         <Input disabled={requestLoading==true?true:false} defaultValue={editFillData?.size} id="size" name='size' type="number" aria-label="sahifalar_soni" placeholder="Masalan: 150" />
        </Field>
        <Field className={'gap-1 lg:col-span-1'}>
         <FieldLabel htmlFor="authors">Muallif(lar)</FieldLabel>
         <Input disabled={requestLoading==true?true:false} id="authors" defaultValue={editFillData?.authors} name='authors' type="text" max={new Date().getFullYear()} placeholder="Masalan: M.R.Radjabov, F.E. Ochilov" aria-label="muallif(lar)" />
        </Field>
        <Field className={'gap-1 lg:col-span-1'}>
         <FieldLabel htmlFor="keywords">Qidiruv so'zlari</FieldLabel>
         <Input disabled={requestLoading==true?true:false}  id="keywords" defaultValue={editFillData?.keywords} name='keywords' type="text" max={new Date().getFullYear()} placeholder="Masalan: chizma, tutashma" aria-label="qidiruv_so'zlari" />
        </Field>
        <Field className={'gap-1 lg:col-span-full'}>
         <FieldLabel htmlFor="cover">Rasm veb-manzili</FieldLabel>
         <Input disabled={requestLoading==true?true:false} id="cover" defaultValue={editFillData?.cover} name='cover' type="text" max={new Date().getFullYear()} placeholder="Masalan: https://json-api.uz/mnt/file-1747846982055.jpg" aria-label="rasm_veb-manzili" />
        </Field>
        <Field className={'gap-1 lg:col-span-2'}>
         <FieldLabel htmlFor="summary">Tavsif</FieldLabel>
         <Textarea disabled={requestLoading==true?true:false} id="summary" defaultValue={editFillData?.summary} name='summary' type="text" max={new Date().getFullYear()} placeholder="Masalan: Bu kitob sizga Chizmachilikni o'rgatadi." aria-label="tavsif" />
        </Field>
        <div className='flex gap-2 w-full items-center justify-end col-span-full flex-col sm:flex-row'>
          <Link to={'/dashboard'} className='w-full sm:w-auto'>
          <Button variant='outline' type='button' className={'cursor-pointer w-full'}>
            Bekor qilish
          </Button>
          </Link>
          <Button disabled={requestLoading==true?true:false} className={'cursor-pointer w-full sm:w-auto min-w-[100px]'}>
            {requestLoading==true?
            <span className='animate-spin'>
              <Loader/>
            </span>
            :action=='edit'?'Tahrirlash':'Qo\'shish'}
          </Button>
        </div>
      </form>
    </main>
    <Footer/>
    </div>
  )
}
