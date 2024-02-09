import React from 'react';
import { useSelector } from 'react-redux';
import ActiveReselve from '../ActiveReselve';

export default function ProfileInfo() {
  const { infoUser } = useSelector((state) => state.ProfileInfo);

  return (
    <div className="flex justify-between items-center mb-[65px] w-full max-w-[810px]">
      <div className="flex items-center gap-[60px]">
        <div className="flex items-center gap-[20px]">
          <div className="w-[100px] h-[100px] rounded-[10px] bg-white overflow-hidden flex items-center justify-center">
            <img src={`http://localhost:8000${infoUser.image}`} alt="ava" />
          </div>
          <div>
            <p className="font-[700] text-[30px]">{infoUser.first_name}</p>
            <p className="font-[300] text-[14px]">Сотрудник</p>
          </div>
        </div>
        <div>
          <p className="text-[20px]">Пол</p>
          <p className="text-[14px] font-[300]">{infoUser.gender}</p>
        </div>
      </div>
      <ActiveReselve />
    </div>
  );
}
