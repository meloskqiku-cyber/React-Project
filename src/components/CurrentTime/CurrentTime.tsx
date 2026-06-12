import { useEffect, useState } from "react";

const formatDateTime = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${month}/${day}/${year} - ${hours}:${minutes}:${seconds}`;
};

export const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(() => formatDateTime(new Date()));

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentTime(formatDateTime(new Date()));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return <span className="text-xs font-bold cursor-pointer">{currentTime}</span>;
};
