import { setIsActivePopup, setMarkerClose } from '../../../Redux/Map/Map.slice';
import './MapPopup.css';
import { useSelector, useDispatch } from 'react-redux';

export default function MapPopup() {
  const dispatch = useDispatch();
  const { isActivePopup, place } = useSelector((state) => state.Map);

  const onClickClose = () => {
    dispatch(setMarkerClose(false));
    dispatch(setIsActivePopup(false))
  }

  return (
    <div class={isActivePopup ? 'modal show' : 'modal'}>
      <div class="modal-content">
        <span onClick={onClickClose} class="close cursor-pointer">&times;</span>
        <p>место {place}</p>
      </div>
    </div>
  );
}
