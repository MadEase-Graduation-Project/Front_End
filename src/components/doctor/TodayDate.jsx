import React from "react";

const formatDate = () => {
  const today = new Date();
  const options = { weekday: "long", month: "short", day: "numeric", year: "numeric" };
  let formattedDate = today.toLocaleDateString("en-US", options);

  // Add "st", "nd", "rd", or "th" to the day
  const day = today.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  formattedDate = formattedDate.replace(/\d+/, `${day}${suffix}`);

  return formattedDate;
};

const TodayDate = () => {
  return <div>{formatDate()}</div>;
};

export default TodayDate;
