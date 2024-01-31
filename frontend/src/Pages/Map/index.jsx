import React, { useState } from 'react';
import './Map.css';
import MapInfo from '../../components/Map/MapInfo';
import Element_1 from '../../components/MapsElements/Element_1';
import Element_2 from '../../components/MapsElements/Element_2';
import Element_3 from '../../components/MapsElements/Element_3';
import Element_4 from '../../components/MapsElements/Element_4';
import Element_5 from '../../components/MapsElements/Element_5';
import Element_6 from '../../components/MapsElements/Elelement_6';
import Element_7 from '../../components/MapsElements/Element_7';
import Element_8 from '../../components/MapsElements/Element_8';
import Element_9 from '../../components/MapsElements/Element_9';
import Element_10 from '../../components/MapsElements/Element_10';
import Element_11 from '../../components/MapsElements/Elements_11';
import Element_12 from '../../components/MapsElements/Element_12';


export default function MapOffice() {
  const [scale, setScale] = useState(1);

  const zoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.2, 1));
  };

  const zoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.2, 0.2));
  };

  return (
    <div className="bg-white w-full relative">
      <h3 className="text-[#323232] text-[24px] mt-[20px] text-center font-[700] mb-[50px]">
        Карта
      </h3>
      <MapInfo />
      <button className="text-white btn-size fixed bottom-[190px] right-[30px] z-[99] w-[40px] h-[40px] rounded-[5px] bg-[#0050FF]" onClick={zoomIn}>
        +
      </button>
      <button className="text-white btn-size fixed bottom-[130px] right-[30px] z-[99] w-[40px] h-[40px] rounded-[5px] bg-[#0050FF]" onClick={zoomOut}>
        -
      </button>

      <div className="relative">
        <div className="relative overflow-hidden w-[1500px] h-[850px]">
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: '0 0',
              transition: 'transform 0.3s ease',
              position: 'relative'
            }}>
            <Element_1 />
            <Element_2 />
            <Element_5 />
            <Element_6 />
            <Element_7 />
            <Element_3 />
            <Element_4 />
            <Element_8 />
            <Element_9 />
            <Element_10 />
            <Element_11 />
            <Element_12 />
            <img className="overflow-visible w-[1800px] absolute -left-[50px]" src="/img/Mapp.png" alt="" />     
          </div>
        </div>
      </div>
    </div>
  );
}
