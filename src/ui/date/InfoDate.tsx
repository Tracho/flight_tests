import SVGCalendar from "@/assets/icons/calendar.svg?react";
type Props = {
  date:string;
  svgW?:number;
  svgH?:number;
}
function InfoDate({date, svgW=18 ,svgH=18 }:Props) {
  return (
    <>
      <div className="flex justify-between items-center gap-1">
        <SVGCalendar width={svgW} hanging={svgH} className="dark:fill-white" />
        <span>
          {date&&date} 
        </span>
      </div>
    </>
  );
}

export default InfoDate;
