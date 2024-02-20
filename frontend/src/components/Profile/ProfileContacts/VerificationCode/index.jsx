import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchConfirmEmail,
  fetchConfirmPhone,
  setErrorsConfirm,
  setShowCode,
  setVerificationCodes,
} from '../../../../Redux/Profile/VerificationCode/VerificationCode.slice';
import LoadingSmall from '../../../Loading/LoadingSmall';
import { setLoadedProfile } from '../../../../Redux/Profile/LoadedProfile.slice';

export default function VerificationCode() {
  const dispatch = useDispatch();
  const { messageEmail, messagePhone, errorsConfirm, loadingConfirmEmail, verificationCodes } = useSelector(
    (state) => state.VerificationCode,
  );
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  const handleChange = (index, code, event) => {
    if (/^\d+$/.test(code) || code === '' || event.key === 'Backspace') {
      const newCodes = [...verificationCodes];
      newCodes[index] = code;
      dispatch(setVerificationCodes(newCodes));

      if (code !== '' && index < 5) {
        if (event.key !== 'Backspace') {
          inputRefs[index + 1].current.focus();
        }
      }

      if (code === '' && index > 0) {
        inputRefs[index - 1].current;
        if (event.key === 'Backspace') {
          inputRefs[index - 1].current.select();
        }
      }

      const verificationCode = newCodes.join('');
      if (verificationCode.length === 6) {
        const confirmation_code = {
          confirmation_code: verificationCode,
        };
        if (messageEmail) {
          dispatch(fetchConfirmEmail(confirmation_code));
          dispatch(setLoadedProfile(true))
        }
        if (messagePhone) {
          dispatch(fetchConfirmPhone(confirmation_code))
          dispatch(setLoadedProfile(true))
        }
        dispatch(setVerificationCodes(['', '', '', '', '', '']))
      }
    }
  };

  const onClickShowCode = () => {
    dispatch(setErrorsConfirm(null))
    dispatch(setShowCode(false));
  };

  return (
    <>
      <div className="bg-[black] opacity-[70%] w-full h-[100vh] fixed top-0 left-0 z-[99]"></div>
      <div className="fixed z-[99] w-full h-[100vh] flex items-center justify-center top-0 left-0">
        <div className="flex flex-col relative items-center justify-center gap-[20px] bg-main-color w-full max-w-[800px] h-[500px] px-[20px] rounded-[8px]">
          <p
            onClick={onClickShowCode}
            className="text-[42px] cursor-pointer absolute right-[20px] top-[0px]">
            &times;
          </p>
          {loadingConfirmEmail ? (
            <LoadingSmall />
          ) : (
            <>
              <p className="font-bold text-[24px] mb-[20px]">Введите проверочный код</p>
              <form className="flex gap-[20px]">
                {verificationCodes.map((code, index) => (
                  <input
                    className="text-white text-[26px] text-center outline-none border-[2px] border-red bg-[transparent] rounded-[8px] w-[60px] h-[60px]"
                    key={index}
                    ref={inputRefs[index]}
                    value={code}
                    onChange={(e) => handleChange(index, e.target.value, e)}
                    onKeyDown={(e) => handleChange(index, e.target.value, e)}
                    maxLength={1}
                  />
                ))}
              </form>
              {errorsConfirm ? (
                <p className="text-red">{errorsConfirm}</p>
              ) : (
                  messageEmail ? <p className="text-center">{messageEmail.message}</p> : <p className="text-center">{messagePhone.message}</p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
