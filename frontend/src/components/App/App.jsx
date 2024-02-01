import './App.css';
import { Routes, Route, useParams } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Home from '../../Pages/Home';
import Login from '../../Pages/Login';
import Profile from '../../Pages/Profile';
import MapOffice from '../../Pages/Map';

function App() {
  return (
    <>
      {
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/map" element={<MapOffice />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            {/* <Route path="*" element={<NotFound />} /> */}
          </Route>
        </Routes>
      }
    </>
  );
}

export default App;
