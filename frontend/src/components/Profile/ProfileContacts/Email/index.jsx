import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTextEmail } from '../../../../Redux/Profile/ProfileInfo.slice';
import VerificationCode from '../VerificationCode';
import { fetchChangeEmail } from '../../../../Redux/Profile/VerificationCode/VerificationCode.slice';
import SuccessfulProfile from '../../Successful';
import style from '../ProfileContacts.module.css'


export default function Email() {
  const dispatch = useDispatch();
  const { textEmail } = useSelector((state) => state.ProfileInfo);
  const [initialTextEmail, setInitialTextEmail] = useState(textEmail);
  const { showCode, messageCompletedProfile, errorsChangeEmail } = useSelector(
    (state) => state.VerificationCode,
  );
  const inputRefEmail = useRef(null);
  const prevTextEmailRef = useRef();
  const [showSaveButtonEmail, setShowSaveButtonEmail] = useState(false);
  const [editableEmail, setEditableEmail] = useState(false);

  useEffect(() => {
    setShowSaveButtonEmail(false);
  }, []);

  useEffect(() => {
    setInitialTextEmail(textEmail);
  }, []);

  useEffect(() => {
    prevTextEmailRef.current = textEmail;
  }, [textEmail]);

  const handleInputChange = (e) => {
    if (editableEmail) {
      dispatch(setTextEmail(e.target.value));
    }
    if (e.target.value !== initialTextEmail) {
      setShowSaveButtonEmail(true);
    } else {
      setShowSaveButtonEmail(false);
    }
  };

  const toggleEditable = () => {
    setEditableEmail(true);
    inputRefEmail.current.focus();
  };

  const toggleEditableSave = () => {
    if (textEmail) {
      setEditableEmail(false);
      const email = {
        new_email: textEmail,
      };
      dispatch(fetchChangeEmail(email));
      setInitialTextEmail(prevTextEmailRef.current);
    }
  };

  const resetTextEmail = () => {
    dispatch(setTextEmail(initialTextEmail));
  };

  return (
    <div className="flex justify-between gap-[65px] w-full">
      {showCode && <VerificationCode />}
      <div className="w-full">
        <div className={`relative w-full flex items-center flex-wrap justify-between bg-[#111111] rounded-[8px] ${style.wrapper_contacts}`}>
          <input
            className={`text-white max-w-[250px] w-full h-[50px] pl-[10px] outline-none bg-[#111111] rounded-l-[8px] ${style.input}`}
            type="text"
            onChange={handleInputChange}
            readOnly={!editableEmail}
            defaultValue={textEmail}
            ref={inputRefEmail}
          />
          {showSaveButtonEmail && editableEmail && textEmail === textEmail ? (
            <div className={`${style.button_wrapper} bg-[#111111] rounded-r-[8px] h-[50px] w-[137px] flex items-center`}>
              <button
                className="w-[130px] bg-red h-[35px] rounded-[6px]"
                onClick={() => {
                  toggleEditableSave();
                  resetTextEmail();
                }}>
                Сохранить
              </button>
            </div>
          ) : (
            <div className={`${style.button_wrapper} bg-[#111111] rounded-r-[8px] h-[50px] w-[137px] flex items-center`}>
              <button
                className={
                  editableEmail
                    ? 'w-[130px] bg-[#313131] h-[35px] rounded-[6px]'
                    : 'w-[130px] bg-[#21211F] h-[35px] rounded-[6px]'
                }
                onClick={toggleEditable}>
                Изменить
              </button>
            </div>
          )}
        </div>
        {errorsChangeEmail && <p className="text-red mt-[10px]">{errorsChangeEmail}</p>}
        {messageCompletedProfile && <SuccessfulProfile />}
      </div>
    </div>
  );
}
