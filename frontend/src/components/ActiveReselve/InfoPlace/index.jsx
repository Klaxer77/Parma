import { useSelector, useDispatch } from 'react-redux';
import { $profile } from '../../../Api/http';
import {
  setCheckData,
  setLoading,
  setMessageCompleted,
} from '../../../Redux/Profile/ActiveReselve/ActiveReselve.slice';
import style from '../../../Pages/ActiveReservation/ActiveReservation.module.css';

export default function InfoPlace() {
  const dispatch = useDispatch();
  const { date_start, date_end, numberPlace, room, first_name, remainingTime, deleteReservation } =
    useSelector((state) => state.ActiveReselve);

  const onClickDelete = () => {
    const fetchDeleteReselve = async () => {
      try {
        dispatch(setLoading(true));
        dispatch(setMessageCompleted(true));
        await $profile.delete(`reservation-delete/${deleteReservation}/`, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('access')}`,
          },
        });
        dispatch(setCheckData(null));
        dispatch(setLoading(false));
      } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
      }
    };
    fetchDeleteReselve();
  };

  return (
    <div className={`${style.wrapper_InfoPlace} flex flex-col gap-[25px] z-[99] flex-wrap w-full max-w-[925px]`}>
      <div className='w-full'>
        <div>
          <p className="font-medium text-[14px] mb-[10px]">Сотрудник</p>
          <p className="text-[30px] font-bold leading-[1]">{first_name}</p>
        </div>

        <div className="flex gap-[25px]">
          <div>
            <p className="font-medium text-[14px] mb-[10px]">Комната</p>
            <p className="text-[30px] font-bold leading-[1]">{room}</p>
          </div>
          <div>
            <p className="font-medium text-[14px] mb-[10px]">Место</p>
            <p className="text-[30px] font-bold text-center leading-[1]">{numberPlace}</p>
          </div>
        </div>
      </div>

      <div>
        <p className="font-medium text-[14px] mb-[10px]">Начало бронирования</p>
        <div className="bg-red flex items-center justify-center w-[240px] h-[55px] rounded-[8px]">
          <p className="text-[22px] font-bold">{date_start}</p>
        </div>
      </div>

      <div>
        <p className="font-medium text-[14px] mb-[10px]">Конец бронирования</p>
        <div className="bg-red flex items-center justify-center w-[240px] h-[55px] rounded-[8px]">
          <p className="text-[22px] font-bold">{date_end}</p>
        </div>
      </div>

      <div>
        <p className="font-medium text-[14px] mb-[10px]">Осталось</p>
        <div className="bg-[#293240] flex items-center justify-center w-[240px] h-[55px] rounded-[8px] border-[1px] border-[#4D4F59]">
          <p className="text-[22px] font-bold">{remainingTime}</p>
        </div>
      </div>

        <button
          style={{
            transition: '0.3s',
          }}
          onClick={() => onClickDelete()}
          className="bg-[#293240] w-full h-[50px] rounded-[8px] hover:bg-red hover:transition hover:ease-in-out">
          Завершить
        </button>
    </div>
  );
}
