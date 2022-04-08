export const DateConverter = (date) => {
  if (date === null) {
    return "NAN";
  }
  const year = date.slice(0, 4);

  let month = date.slice(5, 7);

  let day = date.slice(8, 10);

  if (month === "01") {
    month = "Jan";
  } else if (month === "02") {
    month = "Feb";
  } else if (month === "03") {
    month = "Mar";
  } else if (month === "04") {
    month = "April";
  } else if (month === "05") {
    month = "May";
  } else if (month === "06") {
    month = "June";
  } else if (month === "07") {
    month = "Jully";
  } else if (month === "08") {
    month = "August";
  } else if (month === "09") {
    month = "September";
  } else if (month === "10") {
    month = "October";
  } else if (month === "11") {
    month = "November";
  } else if (month === "12") {
    month = "December";
  }

  const Date = `${day} ${month} ${year}`;
  return Date;
};

export const TimeConverter = (time) => {
  const ActualTime = time.slice(11);
  // Prepend any date. Use your birthday.
  const timeString12hr = new Date(
    "1970-01-01T" + ActualTime + "Z"
  ).toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });
  return timeString12hr;
};
