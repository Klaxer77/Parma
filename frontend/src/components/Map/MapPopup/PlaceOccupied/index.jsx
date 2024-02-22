import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGrayPlace, setLoading } from '../../../../Redux/Map/MapPopupInfo.slice';
import LoadingSmall from '../../../Loading/LoadingSmall';

export default function PlaceOccupied() {
  const dispatch = useDispatch();
  const { infoGrayUser, numberPlace, loading } = useSelector((state) => state.MapPopupInfo);

  const [remainingTime, setRemainingTime] = useState();
  const [endDate, setEndDate] = useState();
  const [lastName, setLastName] = useState();
  const [firstName, setFirstName] = useState();
  const [surName, setSurName] = useState();
  const [imageUser, setImageUser] = useState();

  useEffect(() => {
    if (numberPlace !== null) {
      dispatch(fetchGrayPlace(numberPlace));
    }
  }, [numberPlace]);

  console.log(numberPlace);
  console.log(infoGrayUser);

  useEffect(() => {
    if (infoGrayUser && infoGrayUser.reservation_place) {
      setRemainingTime(
        infoGrayUser.remaining_time.replace(/(\d{2}):(\d{2}):(\d{2})/, '$1д $2ч $3мин'),
      );
      if (infoGrayUser.reservation_place.user) {
        setLastName(infoGrayUser.reservation_place.user.last_name);
        setFirstName(infoGrayUser.reservation_place.user.first_name);
        setSurName(infoGrayUser.reservation_place.user.sur_name);
        setImageUser(infoGrayUser.reservation_place.user.image);
        setEndDate(infoGrayUser.reservation_place.end_date.split(' ').join(', '));
      }
    }
  }, [infoGrayUser, numberPlace]);

  console.log(loading);

  return (
    <>
      {loading ? (
        <LoadingSmall />
      ) : (
        <div className="mt-[25px] flex gap-[35px] items-center">
          <div className="bg-white w-full max-w-[200px] h-[200px] rounded-[12px] flex items-center justify-center">
            <img
              className="w-full h-auto block"
              src={`http://localhost:8000${imageUser}`}
              alt="ava"
            />
          </div>
          <div className="flex flex-col gap-[20px]">
            <div className="flex gap-[10px]">
              <p className="text-[24px] leading-[1]">{lastName}</p>
              <p className="text-[24px] leading-[1]">{firstName}</p>
              <p className="text-[24px] leading-[1]">{surName}</p>
            </div>

            <div>
              <p className="font-medium text-[14px] mb-[10px]">Конец бронирования</p>
              <div className="bg-red flex items-center justify-center w-[240px] h-[40px] rounded-[8px]">
                <p className="text-[22px] font-bold">{endDate}</p>
              </div>
            </div>

            <div>
              <p className="font-medium text-[14px] mb-[10px]">Осталось</p>
              <div className="bg-[#293240] flex items-center justify-center w-[240px] h-[40px] rounded-[8px] border-[1px] border-[#4D4F59]">
                <p className="text-[22px] font-bold">{remainingTime}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
