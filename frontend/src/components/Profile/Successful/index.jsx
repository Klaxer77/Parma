import { useDispatch, useSelector } from 'react-redux';
import style from './Successful.module.css';
import { useEffect, useState } from 'react';
import { setLoadedProfile } from '../../../Redux/Profile/LoadedProfile.slice';
import { setMessageCompleted } from '../../../Redux/Profile/VerificationCode/VerificationCode.slice';


export default function SuccessfulProfile() {
  const dispatch = useDispatch();
  const [isTrue, setIsTrue] = useState(false);
  const { messageCompletedProfile, loadingConfirmEmail } = useSelector((state) => state.VerificationCode);

  useEffect(() => {
    if (messageCompletedProfile.message && loadingConfirmEmail === false) {
      setTimeout(() => {
        setIsTrue(true);
      }, 5);
      setTimeout(() => {
        setIsTrue(false);
        dispatch(setMessageCompleted({}))
      }, 5000);
      dispatch(setLoadedProfile(false));
    }
  }, []);


  return (
    <>
      {messageCompletedProfile.message && (
        <div className={`${style.SuccessfulEmail} ${isTrue ? style['active'] : ''}`}>
          {
            <p className="text-center text-purple-color font-medium p-[10px]">
              {messageCompletedProfile.message}
            </p>
          }
        </div>
      )}
    </>
  );
}
