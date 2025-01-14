import { setIsActivePopup, setMarkers } from '../../../Redux/Map/Map.slice';
import './MapPopup.css';
import { useSelector, useDispatch } from 'react-redux';
import PlaceOccupied from './PlaceOccupied';
import PlaceFree from './PlaceFree';
import { setError } from '../../../Redux/Map/MapReservation.slice';

export default function MapPopup() {
  const dispatch = useDispatch();
  const { isActivePopup, place } = useSelector((state) => state.Map);
  const { activeStatusPopup } = useSelector((state) => state.MapPopupInfo);


  const onClickClose = (ids) => {
    ids.forEach((id) => {
      dispatch(setIsActivePopup(false));
      dispatch(setMarkers({ id, newBool: false }));
      dispatch(setError(null))
    });
  };


  return (
    <div className={isActivePopup ? 'modal show' : 'modal'}>
      <div className="modal-content">
        <span
          onClick={() =>
            onClickClose([
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
              25, 26, 27,
            ])
          }
          className="close cursor-pointer">
          &times;
        </span>
        <p className="text-[26px] font-medium">место {place}</p>
        {activeStatusPopup ? (
          <PlaceFree />
        ) : (
          <PlaceOccupied />
        )}
      </div>
    </div>
  );
}
