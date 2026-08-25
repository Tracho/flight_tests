import SVGTime from "@/assets/icons/time-outline.svg?react";
import SVGTimer from "@/assets/icons/timer.svg?react";
import { useGame } from "@/store/useOpenGameQuiz";
import { useTime, useSetTime } from "@/store/useTimeTic";
import { useEffect } from "react";
type Props = {
  myTime?: string[] | null;
svgW?:number;
  svgH?:number;
};
 
function TimeTic({ myTime = null,svgW=18 ,svgH=18 }: Props) {
  const game = useGame();
  const time = useTime();

  if (myTime == null) {
  const setTime = useSetTime(); 
    useEffect(() => {
      // if (game.game.started === false) {
      setTime({
        timeSeconds: 0,
        timeMinutes: 0,
        TimeHours: 0,
      });
      // }
      if (game.game.started === true && game.game.finish == false) {
        const interval = setInterval(() => {
          setTime((prev) => {
            let seconds = prev.timeSeconds + 1;
            let minutes = prev.timeMinutes;
            let hours = prev.TimeHours;

            if (seconds >= 60) {
              seconds = 0;
              minutes++;
            }

            if (minutes >= 60) {
              minutes = 0;
              hours++;
            }

            return {
              timeSeconds: seconds,
              timeMinutes: minutes,
              TimeHours: hours,
            };
          });
        }, 1000);

        return () => clearInterval(interval);
      }
    }, [setTime, game.game.started]);
  }
  return (
    <>
      <div className="flex justify-between gap-1">
        {game.game.withTimer == true ? (
          <SVGTimer width={svgW} hanging={svgH} />
        ) : (
          <SVGTime width={svgW} hanging={svgH} />
        )}
        {myTime == null ? (
          <span>
            {time.TimeHours > 0 &&
              String(time.TimeHours).padStart(2, "0") + ":"}
            {String(time.timeMinutes).padStart(2, "0")}:
            {String(time.timeSeconds).padStart(2, "0")}
          </span>
        ) : (
          <span>
            {myTime[0] !== "00" && myTime[0] + ":"}
            {myTime[1]}:{myTime[2]}
          </span>
        )}
      </div>
    </>
  );
}

export default TimeTic;
