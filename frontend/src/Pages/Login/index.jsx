import { useEffect, useState } from 'react';
import { fetchLogin } from '../../Redux/Login/Login.slice';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import Header from '../../components/Layout/Header';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { errors, loading } = useSelector((state) => state.Login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onClickLogin = (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    dispatch(fetchLogin(user));
    setEmail('');
    setPassword('')
  };

  useEffect(() => {
    if(localStorage.getItem('access')) {
      navigate('/profile')
    }
  }, [localStorage.getItem('access')])

  return (
    <div className='h-[100vh] overflow-hidden relative'>
    <Header />
    {
      loading === true && <Loading />
    }
    <div className="w-full text-[24px] flex justify-center items-center h-[100vh]">
      <div className="bg-purple-color p-[40px] max-w-[500px] h-[450px] w-full rounded-[12px] text-center mb-[90px]">
        <h3 className="text-center">Вход</h3>
        <form className="flex flex-col gap-[30px] items-center mt-[60px]">
          <div className="max-w-[400px] w-full">
            {errors[1] && <p className="text-red text-[16px] mb-[10px]">{errors[1]}</p>}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-[8px] text-[16px] h-[40px] pl-[10px] outline-none text-[#3E3E3E]"
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="max-w-[400px] w-full">
            {errors[2] && <p className="text-red text-[16px] mb-[10px]">{errors[2]}</p>}
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-[8px] text-[16px] h-[40px] pl-[10px] outline-none text-[#3E3E3E]"
              type="password"
              placeholder="Password"
            />
          </div>
          {errors[0] && <p className="text-red text-[16px]">{errors[0]}</p>}
        </form>
        <button
          onClick={onClickLogin}
          className="text-[20px] bg-button-color max-w-[180px] w-full h-[40px] rounded-[8px] mt-[40px] mb-[40px]">
          Войти
        </button>
      </div>
    </div>
    </div>
  );
}
