import React from 'react';

export default function ProfileInfo() {
  return (
    <div className="flex justify-between items-center mb-[65px] w-full max-w-[705px]">
      <div className="flex items-center gap-[20px]">
        <div className="w-[100px] h-[100px] rounded-[10px] bg-white overflow-hidden flex items-center justify-center">
          <img src="/img/ava.jpg" alt="ava" />
        </div>
        <div>
          <p className="font-[700] text-[30px]">Gram4ik</p>
          <p className="font-[300] text-[14px]">Сотрудник</p>
        </div>
      </div>
      <div>
        <p className="text-[20px]">Пол</p>
        <p className="text-[14px] font-[300]">Мужской</p>
      </div>
    </div>
  );
}
