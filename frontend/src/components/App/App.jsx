import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Layout from '../Layout/Layout';
import Home from '../../Pages/Home';
import Login from '../../Pages/Login';
import Profile from '../../Pages/Profile';
import MapOffice from '../../Pages/Map';
import { useEffect } from 'react';
import { setMapButtonActive, setMenuActive } from '../../Redux/Menu/Menu.slice';
import NotFound from '../../Pages/NotFound';
import HistoryReservation from '../../Pages/HistoryReservation';
import ActiveReservation from '../../Pages/ActiveReservation' 
import baseURL from '../../Api/http';


function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const url = window.location.href;

  useEffect(() => {
    if (url == `${baseURL}/home`) {
      dispatch(setMenuActive(-1));
      dispatch(setMapButtonActive(false));
    }
    if (url == `${baseURL}/login`) {
      dispatch(setMenuActive(-1));
      dispatch(setMapButtonActive(false));
    }
    if (url == `${baseURL}/profile`) {
      dispatch(setMenuActive(0));
      dispatch(setMapButtonActive(false));
    }
    if (url == `${baseURL}/historyReserv`) {
      dispatch(setMenuActive(2));
      dispatch(setMapButtonActive(false));
    }
    if (url == `${baseURL}/map`) {
      dispatch(setMenuActive(3));
      dispatch(setMapButtonActive(true));
    }
  }, [window.location.href]);

  

  return (
    <>
      {
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/map" element={<MapOffice />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/history" element={<HistoryReservation />}></Route>
            <Route path="/active" element={<ActiveReservation />}></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      }
    </>
  );
}

export default App;
