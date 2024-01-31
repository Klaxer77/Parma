import { useState, useEffect, useRef } from 'react';
import ProfileInfo from '../../components/Profile/ProfileInfo';
import InputMask from 'react-input-mask';
import ProfileContacts from '../../components/Profile/ProfileContacts';
import PersonalDate from '../../components/Profile/PersonalDate';

export default function Profile() {
  return (
    <div className="w-full flex items-center justify-center mt-[50px]">
      <div className="bg-purple-color h-[820px] w-full max-w-[1330px] rounded-[8px] px-[60px] pb-[60px] pt-[40px]">
        <h3 className="text-center text-[26px] mb-[40px]">ПРОФИЛЬ</h3>
        <ProfileInfo />
        <ProfileContacts />
        <PersonalDate />
        <div className='flex justify-center'>
          <button className="w-[100px] bg-red h-[35px] rounded-[6px]">Выйти</button>
        </div>
      </div>
    </div>
  );
}
