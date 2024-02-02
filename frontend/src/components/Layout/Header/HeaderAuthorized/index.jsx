import React from 'react'
import { Link } from 'react-router-dom'
import Menu from '../../../Menu'
import { useSelector } from 'react-redux' 

export default function HeaderAuthorized() {
  const { infoUser } = useSelector(state => state.ProfileInfo)


  return (
    <header className="bg-purple-color h-[120px] border-b-[3px] border-white flex items-center flex-wrap">
      <div className='flex justify-between items-center w-full max-w-[1570px] mx-auto px-[20px] h-[90px] pb-[4px] flex-wrap'>
        <Menu />
        <div className='flex items-center gap-[10px]'>
          <div className='rounded-[50%] overflow-hidden w-[50px] h-[50px] bg-white flex justify-center items-center'>
            <img className='w-full h-auto block' src={`http://localhost:8000${infoUser.image}`} alt="" />
          </div>
          <p>{infoUser.first_name}</p>
        </div>
      </div>
    </header>
  )
}