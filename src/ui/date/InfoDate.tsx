import SVGCalendar from "@/assets/icons/calendar.svg?react";
type Props = {
  date:string;
}
function InfoDate({date}:Props) {
  return (
    <>
      <div className="flex justify-between items-center gap-1">
        <SVGCalendar width={24} hanging={24} className="dark:fill-white" />
        <span className="text-lg">
          {date&&date} 
        </span>
      </div>
    </>
  );
}

export default InfoDate;
