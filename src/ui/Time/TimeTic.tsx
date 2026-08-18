import { useGame } from "@/store/useOpenGameQuiz";
import { useTime, useSetTime } from "@/store/useTimeTic";
import { useEffect } from "react";

function TimeTic() {
  const time = useTime();
  const setTime = useSetTime();
  const game = useGame();
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

  return (
    <>
      {String(time.TimeHours).padStart(2, "0")}:
      {String(time.timeMinutes).padStart(2, "0")}:
      {String(time.timeSeconds).padStart(2, "0")}
    </>
  );
}

export default TimeTic;
