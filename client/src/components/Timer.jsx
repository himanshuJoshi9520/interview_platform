import React from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Timer({ timeLeft, totalTime, isOverTime = false, overTimeSeconds = 0 }) {
  if (isOverTime) {
    // Overtime: show a full red ring that pulses, counting up
    return (
      <div className='w-20 h-20 animate-pulse'>
        <CircularProgressbar
          value={100}
          text={`+${overTimeSeconds}s`}
          styles={buildStyles({
            textSize: "24px",
            pathColor: "#ef4444",
            textColor: "#ef4444",
            trailColor: "#3f1f1f",
          })}
        />
      </div>
    );
  }

  const percentage = (timeLeft / totalTime) * 100;
  const isLow = timeLeft <= 10;

  return (
    <div className='w-20 h-20'>
      <CircularProgressbar
        value={percentage}
        text={`${timeLeft}s`}
        styles={buildStyles({
          textSize: "28px",
          pathColor: isLow ? "#f97316" : "#10b981",
          textColor: isLow ? "#f97316" : "#ef4444",
          trailColor: "#e5e7eb",
        })}
      />
    </div>
  );
}

export default Timer
