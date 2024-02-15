import ProfileInfo from '../../components/Profile/ProfileInfo';
import ProfileContacts from '../../components/Profile/ProfileContacts';
import PersonalDate from '../../components/Profile/PersonalDate';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setInfoUser,
  setLoaded,
  setLoadedProfile,
  setTextEmail,
  setTextNumber,
} from '../../Redux/Profile/ProfileInfo.slice';
import { setIsAuth } from '../../Redux/Login/Login.slice';
import baseUrl, { $profile } from '../../Api/http';
import Loading from '../../components/Loading';

export default function Profile() {
  const [scroll, setScroll] = useState(false)
  const loaded = useSelector((state) => state.ProfileInfo.loaded);
  const loadedProfile = useSelector((state) => state.ProfileInfo.loadedProfile);
  const dispatch = useDispatch();

  const onClickExit = () => {
    localStorage.removeItem('access');
    dispatch(setIsAuth(false));
    dispatch(setLoaded(true));
    window.location.href = `${baseUrl}login`;
    dispatch(setLoaded(false));
  };

  useEffect(() => {
    dispatch(setLoaded(true));
    if (!localStorage.getItem('access')) {
      window.location.href = `${baseUrl}login`;
    }
    dispatch(setLoaded(false));

    const fetchProfile = async () => {
      dispatch(setLoaded(true));
      setScroll(true)
      try {
        if (scroll) {
          document.body.style.overflow = 'hidden';
        } 
        const response = await $profile.get('profile', {
          headers: {
            Authorization: `JWT ${localStorage.getItem('access')}`,
          },
        });
        dispatch(setInfoUser(response.data));
        console.log(response.data);
        dispatch(setTextEmail(response.data.email));
        dispatch(setTextNumber(response.data.phone));
        dispatch(setLoaded(false));
        if (!scroll) {
          document.body.style.overflow = 'auto';
        } 
      } catch (error) {
        console.log(error);
      }
    };
    if (loadedProfile) {
      fetchProfile();
    }
    dispatch(setLoadedProfile(false))
  }, [scroll]);

  return (
    <div className="w-full flex items-center justify-center mt-[40px]">
      <div className="bg-purple-color h-[820px] w-full max-w-[1330px] rounded-[8px] px-[60px] pb-[60px] pt-[20px]">
        {loaded ? (
          <Loading />
        ) : (
          <>
            <h3 className="text-center font-bold text-[26px] mb-[40px]">ПРОФИЛЬ</h3>
            <ProfileInfo />
            <ProfileContacts />
            <PersonalDate />
            <div className="flex justify-center">
              <button onClick={onClickExit} className="w-[100px] bg-red h-[35px] rounded-[6px]">
                Выйти
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
