import moment from "moment";

export const capitalize = (value) => {
  if (!value || typeof value !== "string") {
    return "";
  }

  return (
    value
      .split(" ") // ["san", "francisco"]
      .map(
        (word) =>
          // S + an = San
          word[0].toUpperCase() + word.slice(1)
      )
      // San + " "+ Francisco
      .join(" ")
  );
};

export const formatDate = (date, dateFormat = "YYYY/MM/DD") => {
  if (!date || typeof date !== "string") {
    return "";
  } else {
    return moment(date).format(dateFormat);
  }
};
