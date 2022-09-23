import moment from "moment";

export const renderLanguage = (array: any, obj: any) => {
  return array?.filter((val: any) => val.iso_639_1 === obj)[0]?.english_name;
};

export const getTimeFromMins = (mins: any) => {
  if (mins >= 24 * 60 || mins < 0) {
    throw new RangeError(
      "Valid input should be greater than or equal to 0 and less than 1440."
    );
  }
  var h = (mins / 60) | 0,
    m = mins % 60 | 0;
  return moment.utc().hours(h).minutes(m).format("h[h] mm[m] ");
};

export const currencyFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
