import { useEffect, useRef, useState } from "react";

function CountDown() {
  // set base time / d-day
  const currentTime = new Date();
  const day = new Date("2022.04.25 16:00:00"); // 동적 데이터 추후 추가.
  const sec = 1000;
  const min = sec*60;
  const hour = min*60;
  const setTimer = () =>{
    const left = (day.getTime() - currentTime.getTime())
      return {
        hours : Math.floor(left/hour),
        minutes : Math.floor(left/min) - Math.floor(left/hour)*60,
        seconds : Math.floor(left/sec) - Math.floor(left/min)*60
    }
  }

  // set State
  const [leftTime, setLeftTime] = useState(setTimer());
  const {hours, minutes, seconds} = leftTime
  
  // get
  const getLeftTime = () => {
    setLeftTime(setTimer());
  };

  //Hook for interval
  const countdown = useRef(getLeftTime);
  // update ref.current by every rendering
  useEffect(() => {
    countdown.current = getLeftTime;
  });
  // set Interval
  useEffect(() => {
    const counting = setInterval(countdown.current, 1000);
    return () => clearInterval(counting);
  }, [getLeftTime]);
  return (
    <div>
        {hours} : {minutes} : {seconds}
    </div>
  );
}

export default CountDown;
