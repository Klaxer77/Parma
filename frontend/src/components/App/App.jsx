import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Layout from '../Layout/Layout';
import Home from '../../Pages/Home';
import Login from '../../Pages/Login';
import Profile from '../../Pages/Profile';
import MapOffice from '../../Pages/Map';
import { useEffect } from 'react';
import { setMapButtonActive, setMenuActive } from '../../Redux/Menu/Menu.slice';
import NotFound from '../../Pages/NotFound';
import HistoryReselve from '../../Pages/HistoryReselve';
import ActiveReselve from '../../Pages/ActiveReselve' 
import baseUrl from '../../Api/http';


function App() {
  const dispatch = useDispatch();

  const url = window.location.href;

  useEffect(() => {
    if (url == 'http://localhost:3000/home') {
      dispatch(setMenuActive(-1));
      dispatch(setMapButtonActive(false));
    }
    if (url == 'http://localhost:3000/login') {
      dispatch(setMenuActive(-1));
      dispatch(setMapButtonActive(false));
    }
    if (url == 'http://localhost:3000/profile') {
      dispatch(setMenuActive(0));
      dispatch(setMapButtonActive(false));
    }
    if (url == 'http://localhost:3000/historyReserv') {
      dispatch(setMenuActive(2));
      dispatch(setMapButtonActive(false));
    }
    if (url == 'http://localhost:3000/map') {
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
            <Route path="/history" element={<HistoryReselve />}></Route>
            <Route path="/activeReselve" element={<ActiveReselve />}></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      }
    </>
  );
}

export default App;
