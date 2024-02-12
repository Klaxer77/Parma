import { setIsActivePopup, setMarkers, updateMarkers } from '../../../Redux/Map/Map.slice';
import './MapPopup.css';
import { useSelector, useDispatch } from 'react-redux';

export default function MapPopup() {
  const dispatch = useDispatch();
  const { isActivePopup, place, markers } = useSelector((state) => state.Map);

  const onClickClose = (ids) => {
    ids.forEach(id => {
      dispatch(setIsActivePopup(false));
      dispatch(setMarkers({id, newBool: false}));
    });
  }


  return (
    <div class={isActivePopup ? 'modal show' : 'modal'}>
      <div class="modal-content">
        <span onClick={() => onClickClose([1,2,3])} class="close cursor-pointer">&times;</span>
        <p>место {place}</p>
      </div>
    </div>
  );
}
