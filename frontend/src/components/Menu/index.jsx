import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setMenuActive } from '../../Redux/Menu/Menu.slice';

export default function Menu() {
  const dispatch = useDispatch();
  const { menuActive } = useSelector((state) => state.Menu);

  const menu = ['Профиль', 'Активная бронь', 'История брони', 'Карта'];

  const getIndexMenu = (index) => {
    dispatch(setMenuActive(index));
  };


  return (
    <>
      <div>
        <Link to="/home" onClick={() => dispatch(setMenuActive(-1))}>
          <img height={40} width={120} src="/img/logo.png" alt="logo" />
        </Link>
      </div>
      <nav className="flex gap-[20px] flex-wrap">
        {menu.map((value, index) => (
          <Link
            key={value}
            to={
              index === 0
                ? '/profile'
                : index === 1
                ? '/activeReserv'
                : index === 2
                ? '/historyReserv'
                : '/map'
            }>
            <button
              onClick={() => getIndexMenu(index)}
              className={
                menuActive === index
                  ? 'w-[135px] h-[35px] bg-purple-color text-white rounded-[5px] text-[14px]'
                  : 'w-[135px] h-[35px] bg-white text-[#3E3E3E] rounded-[5px] text-[14px]'
              }>
              {value}
            </button>
          </Link>
        ))}
      </nav>
    </>
  );
}
