import React from 'react';
import './MapInfo.css';

export default function MapInfo() {
  return (
    <>
      <div className='flex flex-col gap-[15px]'>
        <div className="flex gap-[25px] items-center pl-[8px]">
          <div className="rounded-[50%] w-[40px] h-[40px] bg-gray-map"></div>
          <p className="text-white text-[16px] font-[300]">Забронированно</p>
        </div>

        <div className="flex gap-[25px] items-center pl-[8px]">
          <div className="rounded-[50%] w-[40px] h-[40px] bg-green"></div>
          <p className="text-white text-[16px] font-[300]">Доступно</p>
        </div>

      </div>
    </>
  );
}
