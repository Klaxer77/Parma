import React from 'react';
import './MapInfo.css'

export default function MapInfo() {
  return (
    <>
      <div className="flex flex-col gap-[35px] mb-[15px]">
        <div className="free">
          <div className="container-free">
            <div className="square-free"></div>
            <div className="circle-free"></div>
          </div>
          <p className="text-purple-color text-[18px]">Свободно</p>
        </div>

        <div className="busy">
          <div className="container-busy">
            <div className="square-busy"></div>
            <div className="circle-busy"></div>
          </div>
          <p className="text-purple-color text-[18px]">Занято</p>
        </div>
      </div>

      <div className="flex gap-[25px] items-center pl-[8px]">
        <div className="circle-entrance"></div>
        <p className="text-purple-color text-[18px]">Вход</p>
      </div>
    </>
  );
}
