import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setMapButtonActive } from '../../../../Redux/Menu/Menu.slice';

export default function HeaderNoAuthorized() {
  const dispatch = useDispatch();
  const { mapButtonActive } = useSelector(state => state.Menu)

  return (
    <header className="bg-white h-[90px] border-b-[3px] border-white">
      <div className='flex justify-between items-center w-full max-w-[1570px] mx-auto px-[20px] h-[90px] pb-[4px]'>
      <Link to="/home" onClick={() => dispatch(setMapButtonActive(false))}>
          <img height={40} width={120} src="/img/logo.png" alt="logo" />
        </Link>

        <Link to='/map'>
        <button
            onClick={() => dispatch(setMapButtonActive(true))}
            className={
              mapButtonActive === true
                ? 'w-[135px] h-[35px] bg-purple-color text-white rounded-[5px] text-[14px] font-medium'
                : 'w-[135px] h-[35px] bg-[#D9D9D9] text-purple-color rounded-[5px] text-[14px] font-medium'
            }>
              Карта
          </button>
          </Link>
        <div>
          <Link to='/login'><button onClick={() => dispatch(setMapButtonActive(false))} className="text-purple-color font-medium text-[20px]">Войти</button></Link>
        </div>
      </div>
    </header>
  );
}
