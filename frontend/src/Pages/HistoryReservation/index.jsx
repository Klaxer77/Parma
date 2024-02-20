import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFirstName } from '../../Redux/Profile/ActiveReselve/ActiveReselve.slice';
import { $profile } from '../../Api/http';
import HistoryReservationBlock from '../../components/HistoryReservation';
import Loading from '../../components/Loading';
import { setCheckData } from '../../Redux/Profile/HistoryReservation/History.slice';

export default function HistoryReservation() {
  const [scroll, setScroll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reservations, setReservations] = useState([]);
  const dispatch = useDispatch();
  const { checkData } = useSelector((state) => state.History);

  useEffect(() => {
    fetchCheck();
  }, []);

  useEffect(() => {
    if (checkData.length !== 0) {
      fetchProfile();
    }
  }, [localStorage.getItem('access')]);

  const fetchCheck = async () => {
    setScroll(true);
    try {
      setLoading(true);
      const response = await $profile.get('profile', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('access')}`,
        },
      });
      dispatch(setCheckData(response.data.reservation_history));
      setReservations(response.data.reservation_history);
      dispatch(setFirstName(response.data.reservation.user.first_name));
      if (checkData.length > 0) {
        fetchProfile();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchProfile = async () => {
    setScroll(true);
    try {
      setLoading(true);
      if (scroll) {
        document.body.style.overflow = 'hidden';
      }
      const response = await $profile.get('profile', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('access')}`,
        },
      });

      if (!scroll) {
        document.body.style.overflow = 'auto';
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  console.log(checkData.length);

  return (
    <div
      className={
        checkData.length == 0
          ? 'flex flex-col gap-[10px] w-full max-w-[1330px] mx-auto mt-[40px] h-[720px] justify-center items-center'
          : 'flex flex-col gap-[10px] w-full max-w-[1330px] mx-auto mt-[40px] h-[720px] overflow-auto history-scroll'
      }>
      {loading ? (
        <Loading />
      ) : checkData.length == 0 ? (
        <div className="w-full flex justify-center items-center bg-purple-color h-[720px]">
          <p className="text-[28px] font-bold">История брони отсутствует</p>
        </div>
      ) : (
        reservations.map((obj) => (
          <HistoryReservationBlock
            key={obj.id}
            numberPlace={obj.place.name}
            room={obj.room[0].name}
            date_start={obj.start_date.split(' ').join(', ')}
            date_end={obj.end_date.split(' ').join(', ')}
            date_all={obj.start_date}
          />
        ))
      )}
    </div>
  );
}
