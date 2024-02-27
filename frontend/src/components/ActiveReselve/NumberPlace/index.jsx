import { useSelector } from 'react-redux';
import style from '../../../Pages/ActiveReservation/ActiveReservation.module.css'

export default function NumberPlace() {
  const { numberPlace } = useSelector((state) => state.ActiveReselve);

  return (
      <div className={`relative border-[1px] border-[#4D4F59] rounded-[8px] flex flex-col items-center justify-center px-[50px] py-[100px] ${style.wrapper}`}>
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
        <svg
        className={style.svg_PlaceGray}
          width="209"
          height="172"
          viewBox="0 0 209 172"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M61.5663 143.78C57.9629 143.78 55.0418 140.859 55.0418 137.255L55.0418 108.447C55.0418 104.844 57.9629 101.923 61.5664 101.923C65.1698 101.923 68.0909 104.844 68.0909 108.447L68.0909 137.255C68.0909 140.859 65.1698 143.78 61.5663 143.78ZM62.7567 168.096C61.9795 166.945 61.5642 165.589 61.5642 164.2L61.5642 160.082C61.5642 155.531 65.2535 151.841 69.8044 151.841L74.6771 151.841C77.3445 151.841 79.5068 149.679 79.5068 147.012C79.5068 144.344 81.6692 142.182 84.3365 142.182L121.98 142.182C124.648 142.182 126.81 144.344 126.81 147.012C126.81 149.679 128.972 151.841 131.64 151.841L136.513 151.841C141.063 151.841 144.753 155.531 144.753 160.082L144.753 165.627C144.753 167.107 144.16 168.526 143.106 169.565C142.071 170.587 140.675 171.16 139.22 171.16L68.5243 171.16C66.2121 171.16 64.0509 170.012 62.7567 168.096ZM133.507 101.446L186.725 101.446C198.683 101.446 208.377 91.7521 208.377 79.7941L208.376 22.429C208.376 10.471 198.682 0.777084 186.724 0.777082L22.0764 0.777068C10.1184 0.777067 0.42462 10.471 0.424772 22.429L0.425499 79.7941C0.425651 91.7521 10.1197 101.446 22.0777 101.446L72.9165 101.446C72.9598 101.714 72.9822 101.989 72.9822 102.27L72.9822 129.141C72.9822 133.692 76.6715 137.381 81.2224 137.381L125.094 137.381C129.645 137.381 133.335 133.692 133.335 129.141L133.335 102.843C133.335 102.361 133.394 101.893 133.507 101.446ZM138.23 136.44C138.23 140.494 141.517 143.78 145.571 143.78C149.624 143.78 152.911 140.494 152.911 136.44L152.911 109.263C152.911 105.209 149.624 101.923 145.571 101.923C141.517 101.923 138.23 105.209 138.23 109.263L138.23 136.44Z"
            fill="url(#paint0_linear_67194_467)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_67194_467"
              x1="104.401"
              y1="171.16"
              x2="104.401"
              y2="0.777075"
              gradientUnits="userSpaceOnUse">
              <stop stopColor="#293240" stopOpacity="0" />
              <stop offset="1" stopColor="#293240" />
            </linearGradient>
          </defs>
        </svg>
      </div>
  );
}
