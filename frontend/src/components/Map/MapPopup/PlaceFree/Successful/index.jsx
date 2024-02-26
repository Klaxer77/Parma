import { useSelector, useDispatch } from 'react-redux';
import style from '../../../../Profile/Successful/Successful.module.css';
import { useEffect, useState } from 'react';
import { setIsActivePopup, setMarkers } from '../../../../../Redux/Map/Map.slice';

export default function SuccessfulMapReservation({fetchMapAll}) {
  const dispatch = useDispatch();
  const [isTrue, setIsTrue] = useState(false);
  const { messageCompletedReservation } = useSelector((state) => state.MapReservation);
  const ids = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27,
  ];

  useEffect(() => {
    if (messageCompletedReservation) {
      setTimeout(() => {
        ids.forEach((id) => {
          dispatch(setMarkers({ id, newBool: false }));
        })
        setIsTrue(true);
      }, 1);
      setTimeout(() => {
        setIsTrue(false);
      }, 5000);
      dispatch(setIsActivePopup(false));
      fetchMapAll()
    }
  }, []);

  return (
    <div className={`${style.SuccessfulReservation} ${isTrue ? style['active'] : ''}`}>
      <p className="text-center text-purple-color font-medium p-[10px]">
        {messageCompletedReservation.detail}
      </p>
    </div>
  );
}
