import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsActivePopup, setPlace, setMarkers } from '../../Redux/Map/Map.slice';
import { setActiveStatusPopup, setNumberPlace } from '../../Redux/Map/MapPopupInfo.slice';

export default function Element_12({ places }) {
  const { markers } = useSelector((state) => state.Map);
  const [published, setPublished] = useState();
  const [status, setStatus] = useState();
  const dispatch = useDispatch();

  const onClickPlace = (place, id) => {
    dispatch(setPlace(place));
    dispatch(setMarkers({ id, newBool: true }));
    setTimeout(() => {
      dispatch(setIsActivePopup(true));
    }, 600);
  };

  const onClickGrayReservation = () => {
    dispatch(setActiveStatusPopup(false));
    dispatch(setNumberPlace(10));
  };

  const onClickGreenReservation = () => {
    dispatch(setActiveStatusPopup(true));
    dispatch(setNumberPlace(10));
  };

  useEffect(() => {
    let result = null;

    places.forEach((subArray) => {
      subArray.forEach((obj) => {
        if (obj.id === 10) {
          setPublished(obj.published);
          result = obj.status;
          setStatus(result);
        }
      });
    });
  }, [places, setStatus, status]);


  return (
    published &&
    <div
      onClick={() => onClickPlace(10, 10)}
      className="10 free absolute left-[133px] top-[552px] z-[99] cursor-pointer">
      <img
        className={
          markers[9].element
            ? 'marker active -top-[10px] left-[15px]'
            : 'marker -top-[30px] z-0 left-[15px]'
        }
        src="/img/icons/pin-mark.png"
        alt=""
      />
      {status === 'Свободно' ? (
        <svg
        className='rotate-[-124deg]'
        onClick={onClickGreenReservation}
          width="49"
          height="40"
          viewBox="0 0 49 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M34.629 6.53072C35.4587 6.53072 36.1313 7.20333 36.1313 8.03303V14.6845C36.1313 15.5142 35.4587 16.1868 34.629 16.1868C33.7993 16.1868 33.1267 15.5142 33.1267 14.6845V8.03303C33.1267 7.20333 33.7993 6.53072 34.629 6.53072ZM34.3544 0.922426C34.533 1.18743 34.6285 1.49976 34.6285 1.81937V2.77419C34.6285 3.82205 33.779 4.67152 32.7311 4.67152H31.6113C30.9959 4.67152 30.4971 5.17035 30.4971 5.78569C30.4971 6.40103 29.9983 6.89986 29.3829 6.89986H20.7195C20.1042 6.89986 19.6053 6.40103 19.6053 5.78569C19.6053 5.17035 19.1065 4.67152 18.4912 4.67152H17.3713C16.3234 4.67152 15.474 3.82206 15.474 2.77419V1.49001C15.474 1.14933 15.6103 0.822825 15.8525 0.583288C16.0913 0.347235 16.4134 0.214844 16.7491 0.214844H33.0239C33.5575 0.214844 34.0561 0.480043 34.3544 0.922426ZM18.0759 16.2462H5.8096C3.05622 16.2462 0.824184 18.4782 0.824219 21.2316L0.824385 34.4402C0.82442 37.1935 3.05651 39.4256 5.80989 39.4256H43.7207C46.4741 39.4256 48.7061 37.1936 48.7061 34.4402L48.7059 21.2316C48.7059 18.4782 46.4738 16.2462 43.7204 16.2462H32.0071C32.002 16.2018 31.9994 16.1566 31.9994 16.1108V9.90634C31.9994 8.85847 31.15 8.00901 30.1021 8.00901H20.0004C18.9525 8.00901 18.103 8.85847 18.103 9.90634V15.9792C18.103 16.0707 18.0937 16.16 18.0759 16.2462ZM16.9774 8.22082C16.9774 7.2874 16.2207 6.53072 15.2873 6.53072C14.3539 6.53072 13.5972 7.2874 13.5972 8.22082V14.4967C13.5972 15.4302 14.3539 16.1868 15.2873 16.1868C16.2207 16.1868 16.9774 15.4302 16.9774 14.4967V8.22082Z"
            fill="#5DE47B"
          />
          <rect
            x="0.665035"
            y="0.665026"
            width="42.5617"
            height="17.9557"
            rx="3.32513"
            transform="matrix(1 0 1.24859e-05 1 2.8164 18.1523)"
            stroke="#2C2E36"
            strokeWidth="1.33005"
          />
        </svg>
      ) : (
        <svg
        onClick={onClickGrayReservation}
          className="cursor-pointer rotate-[56deg]"
          width="49"
          height="40"
          viewBox="0 0 49 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.3769 33.106C13.5472 33.106 12.8746 32.4334 12.8746 31.6037L12.8746 24.9522C12.8746 24.1225 13.5472 23.4499 14.3769 23.4499C15.2066 23.4499 15.8792 24.1225 15.8792 24.9522L15.8792 31.6037C15.8792 32.4334 15.2066 33.106 14.3769 33.106ZM14.6515 38.7143C14.4729 38.4493 14.3774 38.137 14.3774 37.8173L14.3774 36.8625C14.3774 35.8147 15.2269 34.9652 16.2747 34.9652L17.3946 34.9652C18.0099 34.9652 18.5088 34.4664 18.5088 33.851C18.5088 33.2357 19.0076 32.7369 19.6229 32.7369L28.2864 32.7369C28.9017 32.7369 29.4005 33.2357 29.4005 33.851C29.4005 34.4664 29.8994 34.9652 30.5147 34.9652L31.6346 34.9652C32.6824 34.9652 33.5319 35.8147 33.5319 36.8625L33.5319 38.1467C33.5319 38.4874 33.3956 38.8139 33.1533 39.0534C32.9146 39.2895 32.5925 39.4219 32.2567 39.4219L15.9819 39.4219C15.4484 39.4219 14.9498 39.1567 14.6515 38.7143ZM30.9291 23.395L43.1963 23.395C45.9496 23.395 48.1817 21.1629 48.1816 18.4096L48.1815 5.20101C48.1814 2.44763 45.9494 0.215568 43.196 0.215568L5.28519 0.215565C2.5318 0.215565 0.299766 2.44762 0.2998 5.20101L0.299967 18.4096C0.300001 21.1629 2.53209 23.395 5.28547 23.395L16.9993 23.395C17.004 23.438 17.0065 23.4817 17.0065 23.5259L17.0065 29.7304C17.0065 30.7782 17.8559 31.6277 18.9038 31.6277L29.0055 31.6277C30.0534 31.6277 30.9028 30.7782 30.9029 29.7304L30.9029 23.6575C30.9029 23.5676 30.9119 23.4798 30.9291 23.395ZM32.0285 31.4159C32.0285 32.3493 32.7851 33.106 33.7186 33.106C34.652 33.106 35.4087 32.3493 35.4087 31.4159L35.4087 25.14C35.4087 24.2066 34.652 23.4499 33.7186 23.4499C32.7851 23.4499 32.0285 24.2066 32.0285 25.14L32.0285 31.4159Z"
            fill="#67696E"
          />
        </svg>
      )}
    </div>
  );
}
