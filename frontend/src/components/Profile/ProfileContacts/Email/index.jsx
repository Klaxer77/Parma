import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { setTextEmail } from '../../../../Redux/Profile/ProfileInfo.slice';

export default function Email() {
  const dispatch = useDispatch();
  const { textEmail } = useSelector(state => state.ProfileInfo)
  const [showSaveButtonEmail, setShowSaveButtonEmail] = useState(false);
  const [editableEmail, setEditableEmail] = useState(false);
  const inputRefEmail = useRef(null);

  useEffect(() => {
    setShowSaveButtonEmail(false);
  }, []);

  const handleInputChange = (e) => {
    if (editableEmail) {
      dispatch(setTextEmail(e.target.value));
    }
    setShowSaveButtonEmail(true);
  };

  const toggleEditable = () => {
    setEditableEmail(true);
    inputRefEmail.current.focus();
  };

  const toggleEditableSave = () => {
    setEditableEmail(false);
  };

  return (
    <div className="flex justify-between gap-[65px] mb-[65px] w-full">
      <div className="w-full">
        <div className="relative w-full flex items-center">
          <input
            className="text-white h-[50px] pl-[10px] outline-none w-full bg-[#111111] rounded-[8px]"
            type="text"
            onChange={handleInputChange}
            readOnly={!editableEmail}
            defaultValue={textEmail}
            ref={inputRefEmail}
          />
          {showSaveButtonEmail && editableEmail ? (
            <button
              className="absolute right-[7px] w-[130px] bg-red h-[35px] rounded-[6px]"
              onClick={toggleEditableSave}>
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
      </div>
    </div>
  );
}
