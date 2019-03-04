import React from 'react';

const TimeCalculator = ({ time }) => {
  let seconds = Math.round(Math.round(new Date().getTime() - time) / 1000);

  let minutes = Math.round(
    Math.round(new Date().getTime() - time) / (1000 * 60)
  );

  let hours = Math.round(
    Math.round(new Date().getTime() - time) / (1000 * 60 * 60)
  );
  let days = Math.round(
    Math.round(new Date().getTime() - time) / (1000 * 60 * 60 * 24)
  );

  if (seconds < 60) {
    return 'a few seconds';
  } else if (minutes < 60) {
    return minutes === 1 ? (
      <span>a minute ago</span>
    ) : (
      <span>{minutes}&nbsp;minutes ago</span>
    );
  } else if (hours < 24) {
    return hours === 1 ? (
      <span>an hour ago</span>
    ) : (
      <span>{hours}&nbsp;hours ago</span>
    );
  } else {
    return days === 1 ? (
      <span>a day ago</span>
    ) : (
      <span>{days}&nbsp;days ago</span>
    );
  }
};

export default TimeCalculator;
