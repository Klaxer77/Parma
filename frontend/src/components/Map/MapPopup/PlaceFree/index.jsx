import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import style from './PlaceFree.module.css';
import { fetchUserReservation } from '../../../../Redux/Map/MapReservation.slice';
import { format } from 'date-fns';
import LoadingSmallMap from '../../../Loading/LoadingSmallMap';

export default function PlaceFree() {
  const dispatch = useDispatch();
  const { numberPlace } = useSelector((state) => state.MapPopupInfo);
  const { loading, error } = useSelector((state) => state.MapReservation);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const onClickReservation = () => {
    const reservationUser = {
      start_date: format(startDate, 'dd.MM.yyyy HH:mm'),
      end_date: format(endDate, 'dd.MM.yyyy HH:mm'),
      place: numberPlace,
    };
    dispatch(fetchUserReservation(reservationUser));
  };

  return loading ? (
    <LoadingSmallMap />
  ) : (
    <div className="mt-[20px]">
      <div className="flex flex-col items-center">
        <DatePicker
          locale={ru}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showTimeSelect
          dateFormat="dd.MM.yyyy HH:mm"
          timeFormat="HH:mm"
          timeIntervals={30}
          className={style.datePicker}
        />
        <DatePicker
          locale={ru}
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          showTimeSelect
          dateFormat="dd.MM.yyyy HH:mm"
          timeFormat="HH:mm"
          timeIntervals={30}
          className={style.datePicker}
        />
        {
          error && <p className='text-red mt-[10px]'>{error[0]}</p>
        }
        {
          error && <p className='text-red mt-[10px]'>{error[1]}</p>
        }
        <button
          style={{
            transition: '0.3s',
          }}
          onClick={onClickReservation}
          className="bg-[#293240] mt-[20px] w-full max-w-[400px] h-[50px] rounded-[8px] hover:bg-red hover:transition hover:ease-in-out">
          Забронировать
        </button>
      </div>
    </div>
  );
}
