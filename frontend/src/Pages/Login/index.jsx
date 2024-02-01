import { useState } from 'react';
import { fetchLogin } from '../../Redux/Login/Login.slice';
import { useDispatch } from 'react-redux';

export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onClickLogin = (e) => {
    e.preventDefault();
    const user = {
      email: '33333',
      password: '33333'
    }
    dispatch(fetchLogin(user))
  };

  return (
    <div className="w-full pt-[100px] text-[24px] flex justify-center h-[500px]">
      <div className="bg-purple-color p-[40px] max-w-[500px] h-[400px] w-full rounded-[12px] text-center">
        <h3 className="text-center">Вход</h3>
        <form className="flex flex-col gap-[30px] items-center mt-[60px]">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="max-w-[400px] w-full rounded-[8px] text-[16px] h-[40px] pl-[10px] outline-none text-[#3E3E3E]"
            type="text"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="max-w-[400px] w-full rounded-[8px] text-[16px] h-[40px] pl-[10px] outline-none text-[#3E3E3E]"
            type="password"
            placeholder="Password"
          />
        </form>
        <button
          onClick={onClickLogin}
          className="text-[20px] bg-button-color max-w-[180px] w-full h-[40px] rounded-[8px] mt-[40px]">
          Войти
        </button>
      </div>
    </div>
  );
}
