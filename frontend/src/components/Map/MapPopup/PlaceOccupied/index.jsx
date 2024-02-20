


export default function PlaceOccupied() {
  return (
    <div className="mt-[40px] flex gap-[35px] items-center">
      <div className="bg-white w-full max-w-[200px] h-[200px] rounded-[12px] flex items-center justify-center">
        <img className="w-full h-full block" src="/img/main-banner.webp" alt="ava" />
      </div>
      <div className="flex flex-col gap-[20px]">

        <p className="text-[24px] leading-[1]">Голузин Дмитрий Александрович</p>

        <div>
        <p className="font-medium text-[14px] mb-[10px]">Конец бронирования</p>
        <div className="bg-red flex items-center justify-center w-[240px] h-[40px] rounded-[8px]">
          <p className="text-[22px] font-bold">дата</p>
        </div>
        </div>

        <div>
        <p className="font-medium text-[14px] mb-[10px]">Осталось</p>
        <div className="bg-[#293240] flex items-center justify-center w-[240px] h-[40px] rounded-[8px] border-[1px] border-[#4D4F59]">
          <p className="text-[22px] font-bold">время</p>
        </div>
      </div>

      </div>
    </div>
  )
}
