import React from 'react';
import { useSelector } from 'react-redux'; 

export default function PersonalDate() {
  const { infoUser } = useSelector(state => state.ProfileInfo)
  console.log(infoUser);

  return (
    <div className='mb-[40px]'>
      <p className="text-[20px] mb-[20px]">Личные данные</p>
      <div className="flex flex-col gap-[15px] mt-[10px]">

        <div>
          <p className="text-[14px] font-[300] mb-[5px]">Имя</p>
          <div className="flex items-center text-white h-[50px] pl-[10px] outline-none w-full bg-[#111111] rounded-[8px]">
            <p className="text-[16px] font-[300]">{infoUser.first_name}</p>
          </div>
        </div>

        <div>
          <p className="text-[14px] font-[300] mb-[5px]">Фамилия</p>
          <div className="flex items-center text-white h-[50px] pl-[10px] outline-none w-full bg-[#111111] rounded-[8px]">
            <p className="text-[16px] font-[300]">{infoUser.last_name}</p>
          </div>
        </div>

        <div>
          <p className="text-[14px] font-[300] mb-[5px]">Отчество</p>
          <div className="flex items-center text-white h-[50px] pl-[10px] outline-none w-full bg-[#111111] rounded-[8px]">
            <p className="text-[16px] font-[300]">{infoUser.sur_name}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
