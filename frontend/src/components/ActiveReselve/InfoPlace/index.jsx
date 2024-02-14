import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function InfoPlace() {
  const { infoActiveReselve } = useSelector(state => state.ActiveReselve)

  const [dateStart, setDateStart] = useState()
  const [dateEnd, setDateEnd] = useState()
  const [numberPlace, setNumberPlace] = useState()


  useEffect(() => {
    infoActiveReselve.map(obj => (
      setDateStart(obj.start_date.split(' ').join(', ')),
      setDateEnd(obj.end_date.split(' ').join(', ')),
      setNumberPlace(obj.id)
    ));
  }, [dateStart, dateEnd])



  return (
    <div className="flex flex-col gap-[25px] w-full z-[99]">
      <div>
        <p className="font-medium text-[14px] mb-[10px]">Сотрудник</p>
        <p className="text-[30px] font-bold leading-[1]"></p>
      </div>

      <div className="flex gap-[25px]">
        <div>
          <p className="font-medium text-[14px] mb-[10px]">Комната</p>
          <p className="text-[30px] font-bold leading-[1]">Холл</p>
        </div>
        <div>
          <p className="font-medium text-[14px] mb-[10px]">Место</p>
          <p className="text-[30px] font-bold text-center leading-[1]">{numberPlace}</p>
        </div>
      </div>

      <div>
        <p className="font-medium text-[14px] mb-[10px]">Начало бронирования</p>
        <div className="bg-red flex items-center justify-center w-[240px] h-[55px] rounded-[8px]">
          <p className="text-[22px] font-bold">{dateStart}</p>
        </div>
      </div>

      <div>
        <p className="font-medium text-[14px] mb-[10px]">Конец бронирования</p>
        <div className="bg-red flex items-center justify-center w-[240px] h-[55px] rounded-[8px]">
          <p className="text-[22px] font-bold">{dateEnd}</p>
        </div>
      </div>

      <div>
        <p className="font-medium text-[14px] mb-[10px]">Осталось</p>
        <div className="bg-[#293240] flex items-center justify-center w-[240px] h-[55px] rounded-[8px] border-[1px] border-[#4D4F59]">
          <p className="text-[22px] font-bold">7ч 00мин</p>
        </div>
      </div>

      <div>
        <button className="bg-[#293240] w-full h-[50px] rounded-[8px]">Завершить</button>
      </div>
    </div>
  );
}
