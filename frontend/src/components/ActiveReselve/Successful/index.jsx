import { useSelector } from "react-redux"; 
import style from '../../Profile/Successful/Successful.module.css'
import { useEffect, useState } from "react";

export default function SuccessfulActiveReselve() {
  const [isTrue, setIsTrue] = useState(false)
  const { messageCompleted } = useSelector((state) => state.ActiveReselve);
  useEffect(() => {
    if (messageCompleted) {
      setTimeout(() => {
        setIsTrue(true)
      }, 1);
      setTimeout(() => {
        setIsTrue(false)
      }, 5000);
    }
  }, [])


  return (
    <div className={`${style.SuccessfulEmail} ${isTrue ? style['active'] : ''}`}>
      <p className="text-center text-purple-color font-medium p-[10px]">Бронь успешно удалена</p>
    </div>
  )
}

