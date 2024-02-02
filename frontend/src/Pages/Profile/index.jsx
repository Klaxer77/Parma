import ProfileInfo from '../../components/Profile/ProfileInfo';
import ProfileContacts from '../../components/Profile/ProfileContacts';
import PersonalDate from '../../components/Profile/PersonalDate';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { fetchUser } from '../../Redux/Profile/ProfileInfo.slice';

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const onClickExit = () => {
    localStorage.removeItem('access')
  }

  useEffect(() => {
    if(!localStorage.getItem('access')) {
      navigate('/login')
    }
    dispatch(fetchUser())
  }, [localStorage.getItem('access')])

  return (
    <div className="w-full flex items-center justify-center mt-[50px]">
      <div className="bg-purple-color h-[820px] w-full max-w-[1330px] rounded-[8px] px-[60px] pb-[60px] pt-[40px]">
        <h3 className="text-center text-[26px] mb-[40px]">ПРОФИЛЬ</h3>
        <ProfileInfo />
        <ProfileContacts />
        <PersonalDate />
        <div className='flex justify-center'>
          <button onClick={onClickExit} className="w-[100px] bg-red h-[35px] rounded-[6px]">Выйти</button>
        </div>
      </div>
    </div>
  );
}
