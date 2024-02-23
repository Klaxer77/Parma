import { useSelector } from 'react-redux';

export default function InfoPlaceHistory({ numberPlace, room, date_start, date_end }) {
  const { first_name } = useSelector((state) => state.ActiveReselve);

  return (
    <div className="flex flex-col gap-[25px] w-full z-[99]">
      
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

      <div className="flex gap-[25px]">
        <div>
          <p className="font-medium text-[14px] mb-[10px]">Начало бронирования</p>
          <div className="bg-[#293240] flex items-center justify-center w-[240px] h-[55px] rounded-[8px] border-[1px] border-[#4D4F59]">
            <p className="text-[22px] font-bold">{date_start}</p>
          </div>
        </div>

        <div>
          <p className="font-medium text-[14px] mb-[10px]">Конец бронирования</p>
          <div className="bg-[#293240] flex items-center justify-center w-[240px] h-[55px] rounded-[8px] border-[1px] border-[#4D4F59]">
            <p className="text-[22px] font-bold">{date_end}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
