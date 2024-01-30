import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

export default function Layout() {
  return (
    <>
    <Header />
    <div className='max-w-[1570px] mx-auto w-full px-[20px]'>
      <Outlet />
    </div>
    </>
  )
}
