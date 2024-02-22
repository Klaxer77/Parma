import { useDispatch, useSelector} from "react-redux"; 
import style from './Successful.module.css'
import { useEffect, useState} from "react";
import { setLoadedProfile } from "../../../Redux/Profile/LoadedProfile.slice";


export default function SuccessfulProfile() {
  const dispatch = useDispatch();
  const [isTrue, setIsTrue] = useState(false)
  const { messageCompleted, loadingConfirmEmail } = useSelector((state) => state.VerificationCode);

  useEffect(() => {
    if (messageCompleted.message && !loadingConfirmEmail) {
      setTimeout(() => {
        setIsTrue(true)
      }, 5);
      setTimeout(() => {
        setIsTrue(false)
      }, 5000);
      dispatch(setLoadedProfile(false))
    }
  }, [])


  return (
    <>
    {
      messageCompleted.message &&
        <div className={`${style.SuccessfulEmail} ${isTrue ? style['active'] : ''}`}>
        {<p className="text-center text-purple-color font-medium p-[10px]">{messageCompleted.message}</p>}
      </div>
    }
    </>
  )
}
