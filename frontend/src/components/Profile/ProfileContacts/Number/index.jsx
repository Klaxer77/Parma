import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTextNumber } from '../../../../Redux/Profile/ProfileInfo.slice';
import VerificationCode from '../VerificationCode';
import {
  fetchChangePhone,
} from '../../../../Redux/Profile/VerificationCode/VerificationCode.slice';
import SuccessfulProfile from '../../Successful';
import InputMask from 'react-input-mask';
import style from '../ProfileContacts.module.css'

export default function Number() {
  const dispatch = useDispatch();
  const { textNumber } = useSelector((state) => state.ProfileInfo);
  const [initialTextPhone, setInitialTextPhone] = useState(textNumber);
  const { showCode, messageCompletedProfile } = useSelector((state) => state.VerificationCode);
  const inputRefPhone = useRef(null);
  const prevTextPhoneRef = useRef();
  const [showSaveButtonPhone, setShowSaveButtonPhone] = useState(false);
  const [editablePhone, setEditablePhone] = useState(false);

  useEffect(() => {
    setShowSaveButtonPhone(false);
  }, []);

  useEffect(() => {
    setInitialTextPhone(textNumber);
  }, []);

  useEffect(() => {
    prevTextPhoneRef.current = textNumber;
  }, [textNumber]);

  const handleInputChange = (e) => {
    if (editablePhone) {
      dispatch(setTextNumber(e.target.value));
    }
    if (e.target.value !== initialTextPhone) {
      setShowSaveButtonPhone(true);
    } else {
      setShowSaveButtonPhone(false);
    }
  };

  const toggleEditable = () => {
    setEditablePhone(true);
    if (inputRefPhone.current) {
      inputRefPhone.current.getInputDOMNode().focus();
    }
  };

  const toggleEditableSave = () => {
    if (textNumber) {
      setEditablePhone(false);
      const phone = {
        new_phone: textNumber,
      };
      dispatch(fetchChangePhone(phone));
    }
  };

  const resetTextPhone = () => {
    dispatch(setTextNumber(initialTextPhone));
  };

  return (
    <div className="flex justify-between gap-[65px] w-full">
      {showCode && <VerificationCode />}
      <div className="w-full">
        <div className={`relative w-full flex items-center flex-wrap justify-between bg-[#111111] rounded-[8px] ${style.wrapper_contacts_phone}`}>
          <InputMask
            mask="+7 (999) 999-99-99"
            className={`text-white max-w-[250px] w-full h-[50px] pl-[10px] outline-none bg-[#111111] rounded-l-[8px] ${style.input}`}
            type="text"
            onChange={handleInputChange}
            readOnly={!editablePhone}
            defaultValue={textNumber}
            ref={inputRefPhone}
          />
          {showSaveButtonPhone && editablePhone && textNumber === textNumber ? (
            <div className={`${style.button_wrapper} bg-[#111111] rounded-r-[8px] h-[50px] w-[137px] flex items-center`}>
              <button
                className="absolute right-[7px] w-[130px] bg-red h-[35px] rounded-[6px]"
                onClick={() => {
                  toggleEditableSave();
                  resetTextPhone();
                }}>
                Сохранить
              </button>
            </div>
          ) : (
            <div className={`${style.button_wrapper} bg-[#111111] rounded-r-[8px] h-[50px] w-[137px] flex items-center`}>
              <button
                className={
                  editablePhone
                    ? 'absolute right-[7px] w-[130px] bg-[#313131] h-[35px] rounded-[6px]'
                    : 'absolute right-[7px] w-[130px] bg-[#21211F] h-[35px] rounded-[6px]'
                }
                onClick={toggleEditable}>
                Изменить
              </button>
            </div>
          )}
        </div>
        {messageCompletedProfile && <SuccessfulProfile />}
      </div>
    </div>
  );
}
