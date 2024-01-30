import React from 'react'

export default function Home() {
  return (
    <div className='mt-[170px] flex justify-between items-center'>
      <div>
        <h1 className='text-[58px] mb-[80px] leading-[1]'>Система бронирования <br/> рабочих мест</h1>
        <h2 className='text-[20px] font-light mb-[40px]'>Платформа SPlace создана для легкости перехода к кoворкингу, способствует <br/> эффективному 
          использованию рабочего пространства и поднимает творческий <br/> потенциал вашей команды на новый уровень.</h2>
          <button className='text-[20px] bg-button-color max-w-[200px] w-full h-[50px] rounded-[8px]'>Забронировать</button>
      </div>
      <div>
          <img src="/img/main-banner.png" alt="" />
      </div>
    </div>
  )
}
