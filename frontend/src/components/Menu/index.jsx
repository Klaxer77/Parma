import React, { useState } from 'react';

export default function Menu() {
  const [ProfileMenuActive, setProfileMenuActive] = useState(true);
  const [ReservationMenuActive, setReservationMenuActive] = useState(false);
  const [HistoryMenuActive, setHistoryMenuActive] = useState(false);

  const onProfielActive = () => {
    setProfileMenuActive(true);
    setReservationMenuActive(false);
    setHistoryMenuActive(false);
  };

  const onReservationActive = () => {
    setProfileMenuActive(false);
    setReservationMenuActive(true);
    setHistoryMenuActive(false);
  };

  const onHistoryActive = () => {
    setProfileMenuActive(false);
    setReservationMenuActive(false);
    setHistoryMenuActive(true);
  };

  return (
    <nav className="flex gap-[20px]">
          <button
            onClick={() => onProfielActive()}
            className={
              ProfileMenuActive === true
                ? 'w-[135px] h-[35px] bg-purple-color text-white rounded-[5px] text-[14px]'
                : 'w-[135px] h-[35px] bg-white text-[#3E3E3E] rounded-[5px] text-[14px]'
            }>
              Профиль
          </button>
          <button
            onClick={() => onReservationActive()}
            className={
              ReservationMenuActive === true
                ? 'w-[135px] h-[35px] bg-purple-color text-white rounded-[5px] text-[14px]'
                : 'w-[135px] h-[35px] bg-white text-[#3E3E3E] rounded-[5px] text-[14px]'
            }>
              Активная бронь
          </button>
          <button
            onClick={() => onHistoryActive()}
            className={
              HistoryMenuActive === true 
                ? 'w-[135px] h-[35px] bg-purple-color text-white rounded-[5px] text-[14px]'
                : 'w-[135px] h-[35px] bg-white text-[#3E3E3E] rounded-[5px] text-[14px]'
            }>
              История брони
          </button>
    </nav>
  );
}
