import React, { useEffect, useState, useMemo } from "react";
import { useTimer } from "react-timer-hook";
import { Token } from "../../utils/sessionStorage";

const Timer = ({ expiryTimestamp }) => {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  useEffect(() => {
    if (Token !== null) {
      const time = new Date();
      time.setSeconds(time.getSeconds() + 3600);
      restart(time);
    }
  }, []);
  if (Token === null) {
    return <></>;
  } else {
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "16px" }}>
          Logs out in : <span>{minutes}</span>:<span>{seconds}</span>
        </div>
        {/* <p>{isRunning ? "Running" : "Not running"}</p> */}
        {/* <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button> */}
        {/* <button
        onClick={() => {
          // Restarts to 5 minutes timer
          const time = new Date();
          time.setSeconds(time.getSeconds() + 600);
          restart(time);
        }}
      >
        Restart
      </button> */}
      </div>
    );
  }
};
export default Timer;
