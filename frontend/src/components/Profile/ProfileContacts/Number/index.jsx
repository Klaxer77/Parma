import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'; 

export default function Number() {
  const { infoUser } = useSelector(state => state.ProfileInfo)

  const [textNumber, setTextNumber] = useState(infoUser.phone);

  const [showSaveButtonNumber, setShowSaveButtonNumber] = useState(false);
  const [editableNumber, setEditableNumber] = useState(false);
  const inputRefNumber = useRef(null);

  useEffect(() => {
    setShowSaveButtonNumber(false);
  }, []);

  const handleInputChangeNumber = (e) => {
    if (editableNumber) {
      setTextNumber(e.target.value);
    }
    setShowSaveButtonNumber(true);
  };

  const toggleEditableNumber = () => {
    setEditableNumber(true);
    inputRefNumber.current.focus();
  };

  const toggleEditableSaveNumber = () => {
    setEditableNumber(false);
  };

  return (
    <div className="flex justify-between gap-[65px] mb-[65px] w-full">
      <div className="w-full">
        <div className="relative w-full flex items-center">
          <input
            className="text-white h-[50px] pl-[10px] outline-none w-full bg-[#111111] rounded-[8px]"
            type="text"
            value={textNumber}
            onChange={handleInputChangeNumber}
            readOnly={!editableNumber}
            ref={inputRefNumber}
          />
          {showSaveButtonNumber && editableNumber ? (
            <button
              className="absolute right-[7px] w-[130px] bg-red h-[35px] rounded-[6px]"
              onClick={toggleEditableSaveNumber}>
              Сохранить
            </button>
          ) : (
            <button
              className="absolute right-[7px] w-[130px] bg-red h-[35px] rounded-[6px]"
              onClick={toggleEditableNumber}>
              Изменить
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
