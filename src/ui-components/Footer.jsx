import React from 'react'

export default function Footer() {
  return (
    <>
    <footer className='bg-white dark:bg-[#1f1f1f] mt-3 z-3 border-t-1 border-[#ddd5] flex items-center justify-center w-full min-h-[50px] dark:border-[#ddd2]'>
        <div className='max-w-[1440px] w-full flex items-center justify-center py-5 px-5 sm:justify-between flex-wrap flex-col sm:flex-row'>
        <a href='/'>
            <b>chiz</b>
            <span>gi</span>
        </a>
        <p className='text-center'>&copy; {new Date().getFullYear()} Chizgi . Barcha huquqlar himoyalangan. </p>
        </div>
    </footer>
    </>
  )
}
