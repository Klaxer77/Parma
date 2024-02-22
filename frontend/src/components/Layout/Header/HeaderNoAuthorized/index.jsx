import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setMapButtonActive } from '../../../../Redux/Menu/Menu.slice';

export default function HeaderNoAuthorized() {
  const dispatch = useDispatch();

  return (
    <header className="bg-white h-[80px] border-b-[3px] border-white w-full flex items-center">
      <div className='flex justify-between items-center w-full max-w-[1530px] mx-auto px-[20px]'>
      <Link to="/home" onClick={() => dispatch(setMapButtonActive(false))}>
          <img height={40} width={120} src="/img/icons/logo.png" alt="logo" />
        </Link>

        <div>
          <Link to='/login'><button onClick={() => dispatch(setMapButtonActive(false))} className="text-purple-color font-medium text-[20px]">Войти</button></Link>
        </div>
      </div>
    </header>
  );
}
