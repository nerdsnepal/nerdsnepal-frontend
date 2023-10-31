import React, { useState, useEffect } from 'react';

const ExpiredTimer = ({ expirationTime,isTimerFinished }) => {
  const [timeLeft, setTimeLeft] = useState(expirationTime - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = expirationTime - Date.now();
      if (newTimeLeft <= 0) {
        clearInterval(timer);
        setTimeLeft(0);
        isTimerFinished(true);
        localStorage.setItem('timeLeft', undefined);
      } else {
        setTimeLeft(newTimeLeft);
        localStorage.setItem('timeLeft', newTimeLeft);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [expirationTime]);

  // Convert timeLeft to minutes and seconds
  const minutes = Math.floor(timeLeft / 60000);
  const seconds = ((timeLeft % 60000) / 1000).toFixed(0);

  return (
    <div>
      {timeLeft > 0 ? (
        <p className='mr-2'>Expires on {minutes}:{seconds<=9?`0${seconds}`:seconds} </p>
      ) : (
        <p>Timer expired!</p>
      )}
    </div>
  );
};

export default ExpiredTimer;
