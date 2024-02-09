import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setMapButtonActive, setMenuActive } from '../../Redux/Menu/Menu.slice';

export default function Home() {
  const dispatch = useDispatch();

  const onClickBookBtn = () => {
    dispatch(setMenuActive(3));
    dispatch(setMapButtonActive(true))
  }

  return (
    <>
        <div className="mt-[150px] px-[20px] flex justify-between items-center w-full max-w-[1570px] mx-auto">
          <div>
            <h1 className="text-[58px] mb-[80px] leading-[1]">
              Система бронирования <br /> рабочих мест
            </h1>
            <h2 className="text-[20px] font-light mb-[40px]">
              Платформа SPlace создана для легкости перехода к кoворкингу, способствует <br />{' '}
              эффективному использованию рабочего пространства и поднимает творческий <br />{' '}
              потенциал вашей команды на новый уровень.
            </h2>
            <Link to='/map'>
            <button onClick={onClickBookBtn} className="text-[20px] bg-red max-w-[200px] w-full h-[50px] rounded-[8px]">
              Забронировать
            </button>
            </Link>
          </div>
          <div>
            <img src="/img/main-banner.png" alt="" />
          </div>
        </div>
    </>
  );
}
