<template>
  <div class="container">
    <label for="month">Selectionnez un mois : </label>
    <select
      id="month"
      v-model="monthSelected"
      name="month"
      v-on:change="reload"
    >
      <option v-for="month in months" :key="month.label" :value="month">
        {{ month.label }}
      </option>
    </select>
    <Calendar
      v-if="render && monthSelected"
      v-bind:monthSelected="
        monthToDate(monthSelected.month, monthSelected.year)
      "
    />
  </div>
</template>

<script>
import moment from "moment";
import Calendar from "./Calendar";

moment.locale("fr");

export default {
  name: "DatePicker",
  components: {
    Calendar
  },
  methods: {
    monthToDate(month, year) {
      return moment()
        .month(month)
        .year(year);
    },
    reload() {
      this.render = false;
      this.$nextTick(() => {
        this.render = true;
      });
    }
  },
  data() {
    return {
      months: [2018, 2019, 2020, 2021, 2022]
        .map(year => {
          return moment.months().map(month => {
            return {
              month: month,
              year: year,
              label: month + " " + year
            };
          });
        })
        .flat(1),
      render: true,
      monthSelected: ""
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  line-height: 3;
}
</style>
