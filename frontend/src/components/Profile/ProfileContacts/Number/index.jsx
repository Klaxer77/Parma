import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTextNumber } from '../../../../Redux/Profile/ProfileInfo.slice';
import VerificationCode from '../Email/VerificationCode';
import { fetchChangePhone } from '../../../../Redux/Profile/VerificationCode/VerificationCode.slice';
import SuccessfulProfile from '../../Successful';

export default function Number() {
  const dispatch = useDispatch();
  const { textNumber } = useSelector((state) => state.ProfileInfo);
  const [initialTextPhone, setInitialTextPhone] = useState(textNumber);
  const { showCode, messageCompleted } = useSelector((state) => state.VerificationCode);
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
    inputRefPhone.current.focus();
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
    <div className="flex justify-between gap-[65px] mb-[65px] w-full">
      {showCode && <VerificationCode />}
      <div className="w-full">
        <div className="relative w-full flex items-center">
          <input
            className="text-white h-[50px] pl-[10px] outline-none w-full bg-[#111111] rounded-[8px]"
            type="text"
            onChange={handleInputChange}
            readOnly={!editablePhone}
            defaultValue={textNumber}
            ref={inputRefPhone}
          />
          {showSaveButtonPhone && editablePhone && textNumber === textNumber ? (
            <button
              className="absolute right-[7px] w-[130px] bg-red h-[35px] rounded-[6px]"
              onClick={() => {
                toggleEditableSave();
                resetTextPhone();
              }}>
              Сохранить
            </button>
          ) : (
            <button
              className="absolute right-[7px] w-[130px] bg-red h-[35px] rounded-[6px]"
              onClick={toggleEditable}>
              Изменить
            </button>
          )}
        </div>
        {messageCompleted && <SuccessfulProfile />}
      </div>
    </div>
  );
}
