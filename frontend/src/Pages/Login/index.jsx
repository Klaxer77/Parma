import React from 'react'

export default function Login() {
  return (
    <div className='w-full pt-[200px] text-[24px] flex justify-center'>
      <div className='bg-purple-color p-[40px] max-w-[500px] h-[400px] w-full rounded-[12px] text-center'>
        <h3 className='text-center'>Вход</h3>
        <form className='flex flex-col gap-[30px] items-center mt-[60px]'>
          <input className='max-w-[400px] w-full rounded-[8px] text-[16px] h-[40px] pl-[10px] outline-none text-[#3E3E3E]' type="text"  placeholder='Email'/>
          <input className='max-w-[400px] w-full rounded-[8px] text-[16px] h-[40px] pl-[10px] outline-none text-[#3E3E3E]' type="password"  placeholder='Password'/>
        </form>
        <button className='text-[20px] bg-button-color max-w-[180px] w-full h-[40px] rounded-[8px] mt-[40px]'>Войти</button>
      </div>
    </div>
  )
}
