import { useState } from 'react';
import DatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import style from './PlaceFree.module.css';

export default function PlaceFree() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());


  return (
    <div className="mt-[20px]">
      <div className='flex flex-col items-center'>
        <DatePicker
          locale={ru}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showTimeSelect
          dateFormat="dd.MM.yyyy, HH:mm"
          timeFormat="HH:mm"
          timeIntervals={15}
          className={style.datePicker}
        />
        <DatePicker
        locale={ru}
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          showTimeSelect
          dateFormat="dd.MM.yyyy, HH:mm"
          timeFormat="HH:mm"
          timeIntervals={30}
          className={style.datePicker}
        />
        <button className='bg-[#293240] w-full h-[50px] rounded-[8px] hover:bg-red hover:transition hover:ease-in-out'>Забронировать</button>
      </div>
    </div>
  );
}
