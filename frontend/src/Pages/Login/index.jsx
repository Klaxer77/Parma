import { useEffect, useState } from 'react';
import { fetchLogin } from '../../Redux/Login/Login.slice';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import Header from '../../components/Layout/Header';
import { useNavigate } from 'react-router-dom';
import { setMenuActive } from '../../Redux/Menu/Menu.slice';
import { setMessageCompleted } from '../../Redux/Profile/VerificationCode/VerificationCode.slice';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { errors, loading } = useSelector((state) => state.Login);
  const { isAuth } = useSelector((state) => state.Login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleTogglePasswordVisibility = (e) => {
    e.preventDefault();
    setPasswordVisible(!passwordVisible);
  };

  const handleKeyEnter = (e) => {
    if (e.key === 'Enter') {
      const user = {
        email: email,
        password: password,
      };
      dispatch(fetchLogin(user));
      setEmail('');
      setPassword('');
    }
  };

  const onClickLogin = (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    dispatch(fetchLogin(user));
    dispatch(setMessageCompleted({}));
    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    if (isAuth === true) {
      dispatch(setMenuActive(0));
      navigate('/profile');
    }
  }, [isAuth]);

  return (
    <div className="h-[100vh] overflow-hidden relative">
      <Header />
      {loading === true && <Loading />}
      <div className="w-full text-[24px] flex justify-center items-center h-[100vh]">
        <div className="bg-purple-color p-[40px] max-w-[500px] h-auto w-full rounded-[12px] text-center mb-[90px]">
          <h3 className="text-center">Вход</h3>
          <form className="flex flex-col gap-[30px] items-center mt-[60px]">
            <div className="max-w-[400px] w-full">
              <input
                onKeyDown={handleKeyEnter}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-[8px] text-[16px] h-[40px] pl-[10px] outline-none text-[#3E3E3E]"
                type="text"
                placeholder="Email"
              />
              {errors[1] && (
                <p className="text-red text-start mt-[10px] text-[16px] mb-[10px]">{errors[1]}</p>
              )}
            </div>
            <div className="max-w-[400px] w-full relative">
              <input
                onKeyDown={handleKeyEnter}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-[8px] text-[16px] h-[40px] pl-[10px] outline-none text-[#3E3E3E]"
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Password"
              />
              <button onClick={handleTogglePasswordVisibility}>
                {passwordVisible ? (
                  <svg
                    className="absolute w-[16px] right-[10px] top-[13px]"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10.7904 12.9097L9.17617 11.2956C8.80858 11.4267 8.41263 11.4981 8 11.4981C6.067 11.4981 4.5 9.93108 4.5 7.99808C4.5 7.58546 4.5714 7.18951 4.70253 6.82192L2.64112 4.76051C0.938717 6.2771 0 7.99808 0 7.99808C0 7.99808 3 13.4981 8 13.4981C9.01539 13.4981 9.9483 13.2713 10.7904 12.9097Z"
                      fill="#20232F"
                    />
                    <path
                      d="M5.20967 3.08642C6.05172 2.7249 6.98462 2.49808 8 2.49808C13 2.49808 16 7.99808 16 7.99808C16 7.99808 15.0613 9.71905 13.3589 11.2356L11.2975 9.17423C11.4286 8.80664 11.5 8.4107 11.5 7.99808C11.5 6.06509 9.933 4.49808 8 4.49808C7.58738 4.49808 7.19144 4.56949 6.82386 4.70061L5.20967 3.08642Z"
                      fill="#20232F"
                    />
                    <path
                      d="M5.52485 7.64424C5.50847 7.75983 5.5 7.87797 5.5 7.99808C5.5 9.3788 6.61929 10.4981 8 10.4981C8.12012 10.4981 8.23825 10.4896 8.35385 10.4732L5.52485 7.64424Z"
                      fill="#20232F"
                    />
                    <path
                      d="M10.4752 8.35191L7.64618 5.52293C7.76176 5.50655 7.87989 5.49808 8 5.49808C9.38071 5.49808 10.5 6.61737 10.5 7.99808C10.5 8.11819 10.4915 8.23632 10.4752 8.35191Z"
                      fill="#20232F"
                    />
                    <path
                      d="M13.6464 14.3516L1.64645 2.35164L2.35355 1.64453L14.3536 13.6445L13.6464 14.3516Z"
                      fill="#20232F"
                    />
                  </svg>
                ) : (
                  <svg
                    className="absolute w-[16px] right-[10px] top-[13px]"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10.5 8C10.5 9.38071 9.38071 10.5 8 10.5C6.61929 10.5 5.5 9.38071 5.5 8C5.5 6.61929 6.61929 5.5 8 5.5C9.38071 5.5 10.5 6.61929 10.5 8Z"
                      fill="#20232F"
                    />
                    <path
                      d="M0 8C0 8 3 2.5 8 2.5C13 2.5 16 8 16 8C16 8 13 13.5 8 13.5C3 13.5 0 8 0 8ZM8 11.5C9.933 11.5 11.5 9.933 11.5 8C11.5 6.067 9.933 4.5 8 4.5C6.067 4.5 4.5 6.067 4.5 8C4.5 9.933 6.067 11.5 8 11.5Z"
                      fill="#20232F"
                    />
                  </svg>
                )}
              </button>
              {errors[2] && (
                <p className="text-red text-start mt-[10px] text-[16px] mb-[10px]">{errors[2]}</p>
              )}
            </div>
          </form>
          <button
            onClick={onClickLogin}
            className="text-[20px] bg-red max-w-[180px] w-full h-[40px] rounded-[8px] mt-[40px]">
            Войти
          </button>
          {errors[0] && <p className="text-red text-[16px] mt-[25px]">{errors[0]}</p>}
        </div>
      </div>
    </div>
  );
}
