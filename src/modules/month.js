import moment from "moment";

export default class Month {
  constructor(month, year) {
    this.start = moment([year, month]);
    this.end = this.start.clone().endOf("month");
    this.month = month;
    this.year = year;
  }

  getWeekStart() {
    return this.start.weekday();
  }

  getDays() {
    let arr = Array.from({ length: this.start.daysInMonth() }, (x, i) =>
      this.start.clone().add(i, "days")
    );
    return arr;
  }
}
