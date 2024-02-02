import './App.css';
import { Routes, Route, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../Layout/Layout';
import Home from '../../Pages/Home';
import Login from '../../Pages/Login';
import Profile from '../../Pages/Profile';
import MapOffice from '../../Pages/Map';
import { useEffect } from 'react';
import { setMapButtonActive, setMenuActive } from '../../Redux/Menu/Menu.slice';
import NotFound from '../../Pages/NotFound';

function App() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(state => state.Login)

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
    if (url == 'http://localhost:3000/activeReserv') {
      dispatch(setMenuActive(1));
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
  }, []);

  return (
    <>
      {
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/map" element={<MapOffice />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      }
    </>
  );
}

export default App;
