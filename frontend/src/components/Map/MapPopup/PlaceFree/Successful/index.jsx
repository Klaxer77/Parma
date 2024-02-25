import { useSelector } from 'react-redux';
import style from '../../../../Profile/Successful/';
import { useEffect, useState } from 'react';

export default function SuccessfulActiveReselve() {
  const [isTrue, setIsTrue] = useState(false);
  const { completed } = useSelector((state) => state.MapReservation);
  useEffect(() => {
    if (completed) {
      setTimeout(() => {
        setIsTrue(true);
      }, 1);
      setTimeout(() => {
        setIsTrue(false);
      }, 5000);
    }
  }, []);

  return (
    <div className={`${style.SuccessfulEmail} ${isTrue ? style['active'] : ''}`}>
      <p className="text-center text-purple-color font-medium p-[10px]">{completed}</p>
    </div>
  );
}
