import { useSelector } from 'react-redux';
import InfoPlaceHistory from './InfoPlaceHistory';
import { useState } from 'react';

export default function HistoryReservationBlock({
  numberPlace,
  room,
  date_start,
  date_end,
  date_all,
}) {
  const { checkData } = useSelector((state) => state.ActiveReselve);

  let formatedDate = `${date_all}`;
  let newDateAll = formatedDate.slice(0, -5);

  const [dateAll] = useState(newDateAll);
  console.log(checkData);

  return (
    <div className="w-full flex items-center justify-center">
      <div
        className={'bg-purple-color h-auto w-full max-w-[1330px] rounded-[8px] p-[20px] relative'}>
        <div className="flex items-center justify-between mb-[20px]">
          <h4 className="text-[30px] font-bold">{dateAll}</h4>
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15ZM22.5569 9.31813C22.0077 8.76896 21.1173 8.76896 20.5681 9.31813C20.5549 9.33139 20.5424 9.34544 20.5308 9.3602L14.0201 17.6564L10.0948 13.731C9.54559 13.1819 8.6552 13.1819 8.10603 13.731C7.55686 14.2802 7.55686 15.1706 8.10603 15.7198L13.0681 20.6819C13.6173 21.231 14.5077 21.231 15.0569 20.6819C15.0691 20.6696 15.0806 20.6567 15.0914 20.6432L22.5768 11.2865C23.1059 10.7359 23.0993 9.86057 22.5569 9.31813Z"
              fill="#F64343"
            />
          </svg>
        </div>

        <div className="flex items-center gap-[20px] mb-[20px]">
          <div>
            <div className="relative h-[258px] border-[1px] border-[#4D4F59] rounded-[8px] flex flex-col items-center justify-center px-[40px]">
              <div className="mb-[10px] relative">
                <div className="bg-purple-color w-[40px] h-[40px] rounded-[50%] absolute left-[84px] top-[100px] flex items-center justify-center">
                  <p className="font-bold text-[16px]">{numberPlace}</p>
                </div>
                <svg
                  width="208"
                  height="171"
                  viewBox="0 0 208 171"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M146.811 27.3802C150.414 27.3802 153.335 30.3013 153.335 33.9048V62.7128C153.335 66.3162 150.414 69.2374 146.811 69.2374C143.207 69.2374 140.286 66.3162 140.286 62.7128V33.9048C140.286 30.3013 143.207 27.3802 146.811 27.3802ZM145.62 3.06426C146.397 4.21486 146.813 5.57162 146.813 6.9601V11.0786C146.813 15.6295 143.123 19.3187 138.573 19.3187H133.7C131.032 19.3187 128.87 21.481 128.87 24.1484C128.87 26.8158 126.708 28.9781 124.04 28.9781H86.3966C83.7292 28.9781 81.5669 26.8158 81.5669 24.1484C81.5669 21.481 79.4045 19.3187 76.7372 19.3187H71.8644C67.3135 19.3187 63.6243 15.6295 63.6243 11.0786V5.53285C63.6243 4.05287 64.2172 2.63458 65.2705 1.59496C66.306 0.573008 67.7023 0 69.1571 0H139.853C142.165 0 144.326 1.14823 145.62 3.06426ZM74.8707 69.7122H21.6517C9.69363 69.7122 -0.000150899 79.4061 1.76176e-09 91.3641L0.000723903 148.729C0.000874804 160.687 9.69487 170.381 21.6529 170.381H186.301C198.259 170.381 207.952 160.687 207.952 148.729L207.951 91.3641C207.951 79.4061 198.257 69.7122 186.299 69.7122H135.46C135.417 69.4446 135.395 69.17 135.395 68.8902V42.0195C135.395 37.4686 131.705 33.7793 127.155 33.7793H83.2825C78.7315 33.7793 75.0423 37.4686 75.0423 42.0195V68.3176C75.0423 68.7987 74.9828 69.2659 74.8707 69.7122ZM70.1465 34.7203C70.1465 30.6665 66.8602 27.3802 62.8063 27.3802C58.7525 27.3802 55.4662 30.6665 55.4662 34.7203V61.8972C55.4662 65.9511 58.7525 69.2374 62.8063 69.2374C66.8602 69.2374 70.1465 65.9511 70.1465 61.8972V34.7203Z"
                    fill="#F64343"
                  />
                  <rect
                    x="2.88826"
                    y="2.88823"
                    width="184.847"
                    height="77.9821"
                    rx="14.4411"
                    transform="matrix(1 0 1.24859e-05 1 8.64938 77.9883)"
                    stroke="#2C2E36"
                    strokeWidth="5.77646"
                  />
                </svg>
              </div>
            </div>
          </div>
          <InfoPlaceHistory
            numberPlace={numberPlace}
            room={room}
            date_start={date_start}
            date_end={date_end}
          />
        </div>
      </div>
    </div>
  );
}
