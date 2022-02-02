import { useEffect, useState } from "react";
import TimeFragment from "../TimeFragment/TimeFragment";
import "./Clock.css";

export default function Clock() {
  const [hour, setHour] = useState(new Date().getHours());
  const [minute, setMinute] = useState(new Date().getMinutes());
  const [second, setSecond] = useState(new Date().getSeconds());

  useEffect(() => {
    setInterval(() => {
      setSecond(new Date().getSeconds());
    }, 1000);
  }, []);

  useEffect(() => {
    adjustTime(59, second, minute, setMinute);
  }, [second]);

  useEffect(() => {
    adjustTime(23, minute, hour, setHour);
  }, [minute]);

  const adjustTime = (base, controlVal, changingVal, setChangingVal) => {
    if (controlVal === 0) {
      if (changingVal === base) setChangingVal(0);
      if (changingVal < base - 1) {
        setChangingVal(changingVal + 1);
      }
    }
  };

  const generateTimeBlocks = (max, kind, digit) => {
    let timeEl = [];

    for (let i = 0; i <= max; i++) {
      timeEl.push(
        <TimeFragment
          control={kind === "hour" ? hour : kind === "minute" ? minute : second}
          digit={digit}
          id={`${kind}-${i}`}
          key={i}
          val={i}
        />
      );
    }

    return timeEl;
  };

  return (
    <div className="time-wrapper">
      <div className="time-row">{generateTimeBlocks(2, "hour", "tens")}</div>
      <div className="time-row">{generateTimeBlocks(9, "hour", "ones")}</div>
      <div className="time-row">{generateTimeBlocks(5, "minute", "tens")}</div>
      <div className="time-row">{generateTimeBlocks(9, "minute", "ones")}</div>
      <div className="time-row">{generateTimeBlocks(5, "second", "tens")}</div>
      <div className="time-row">{generateTimeBlocks(9, "second", "ones")}</div>
    </div>
  );
}
