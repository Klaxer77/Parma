import React from 'react'
import { Link } from 'react-router-dom'
import Menu from '../../../Menu'

export default function HeaderAuthorized() {
  return (
    <header className="bg-purple-color h-[90px] border-b-[3px] border-white">
      <div className='flex justify-between items-center w-full max-w-[1570px] mx-auto px-[20px] h-[90px] pb-[4px]'>
        <div>
          <Link to='/home'><img height={40} width={120} src="/img/logo.png" alt="logo" /></Link>
        </div>
        <Menu />
        <div className='flex items-center gap-[10px]'>
          <div className='rounded-[50%] overflow-hidden w-[50px] h-[50px] bg-white flex justify-center items-center'>
            <img className='w-full h-auto block' src="/img/ava.jpg" alt="" />
          </div>
          <p>Nickname</p>
        </div>
      </div>
    </header>
  )
}