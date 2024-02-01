import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HeaderNoAuthorized() {

  const [ mapActive, setMapActive] = useState(false)

  return (
    <header className="bg-purple-color h-[90px] border-b-[3px] border-white">
      <div className='flex justify-between items-center w-full max-w-[1570px] mx-auto px-[20px] h-[90px] pb-[4px]'>
        <Link to='/map'>
        <button
            onClick={() => setMapActive(true)}
            className={
              mapActive === true
                ? 'w-[135px] h-[35px] bg-purple-color text-white rounded-[5px] text-[14px]'
                : 'w-[135px] h-[35px] bg-white text-[#3E3E3E] rounded-[5px] text-[14px]'
            }>
              Карта
          </button>
          </Link>
        <div>
          <Link to='/login'><button className="text-white text-[20px]">Войти</button></Link>
        </div>
      </div>
    </header>
  );
}
