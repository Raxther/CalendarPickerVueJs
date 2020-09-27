<template>
  <div class="calendar_container">
    <div class="calendar_header">
      <div class="calendar_year">
        {{ year }}
      </div>
      <div class="calendar_date">
        {{ date_formated }}
      </div>
    </div>
    <div class="calendar_body">
      <div class="calendar_week">
        <div v-for="day in days" :key="day.index" class="calendar_day_header">
          <span
            class="calendar_day_header_title"
            @click="selectAllDay(day.index)"
            >{{ day.label }}</span
          >
        </div>
      </div>
      <div class="calendar_days">
        <div
          class="calendar_day"
          v-bind:style="{ width: (month.getWeekStart() + 1) * 41 + 'px' }"
        ></div>
        <div
          class="calendar_day"
          v-for="day in month.getDays()"
          :key="day.format('DD')"
          v-bind:class="{ selected: isSelected(day) }"
          draggable
          @click="onSelectDate(day)"
          @dragstart="startDrag($event, day)"
          @drop="onDrop($event, day)"
          @dragover.prevent
          @dragenter.prevent
        >
          <span class="calendar_day_hover"></span>
          <span class="calendar_day_text">{{ day.format("DD") }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Month from "../modules/month.js";
moment.locale("fr");

export default {
  props: {
    monthSelected: Object
  },
  data() {
    return {
      daysSelected: [this.monthSelected.clone()],
      days: moment.weekdaysShort().map((e, index) => {
        return {
          label: e.toUpperCase(),
          index
        };
      }),
      month: new Month(this.monthSelected.month(), this.monthSelected.year())
    };
  },
  methods: {
    isSelected(day) {
      return (
        this.daysSelected
          .map(day => day.startOf("d").unix())
          .indexOf(day.unix()) > -1
      );
    },
    onSelectDate(day) {
      this.daysSelected = [day.clone()];
    },
    startDrag(event, day) {
      this.daysSelected = [day.clone()];
    },
    onDrop(event, day) {
      let start = this.daysSelected[0].clone();
      while (day.diff(start.add(1, "d")) >= 0) {
        this.daysSelected.push(start.clone());
      }
    },
    selectAllDay(day) {
      var monday = this.daysSelected[0]
        .clone()
        .startOf("month")
        .day(day);
      if (monday.date() > 7) monday.add(7, "d");
      var month = monday.month();
      this.daysSelected = [monday.clone()];
      while (month === monday.month()) {
        monday.add(7, "d");
        this.daysSelected.push(monday.clone());
      }
    }
  },
  computed: {
    year() {
      return this.daysSelected[0].format("YYYY");
    },

    date_formated() {
      return this.daysSelected[0].format("ll");
    }
  }
};
</script>

<style lang="scss" scoped>
$header_height: 60px;
$day_size: 41px;

.calendar_container {
  position: relative;
  width: 315px;
  box-shadow: 10px 10px 5px 0px rgba(209, 209, 209, 1);
}
.calendar_header {
  background-color: #1565c0;
  color: #fff;
  padding: 20px;
  height: $header_height;
}
.calendar_body {
  text-align: center;
  background-color: white;
  height: $day_size * 7;
}
.calendar_year {
  opacity: 0.7;
  margin-bottom: 10px;
  line-height: 16px;
}
.calendar_date {
  font-size: 32px;
  line-height: 32px;
}
.calendar_week {
  font-size: 12px;
  list-style: 12px;
  color: black;
  padding: 0px 14px;
}
.calendar_day_header {
  float: left;
  width: $day_size;
}
.calendar_day_header_title {
  cursor: pointer;
}
.calendar_day {
  position: relative;
  width: $day_size;
  height: $day_size;
  float: left;
  line-height: $day_size;
  cursor: pointer;
}
.calendar_days {
  padding: 0px 14px;
}
.calendar_day_hover {
  top: 2px;
  left: 2px;
  position: absolute;
  background: #1565c0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  transition: all 450ms cubic-bezier(0.05, 0.99, 0, 1.13);
  transform: scale(0);
}
.calendar_day_text {
  position: relative;
}
.calendar_day:hover {
  color: white;
  .calendar_day_hover {
    transform: scale(1);
  }
}
.calendar_day.selected {
  color: white;
  .calendar_day_hover {
    transform: scale(1);
  }
}
</style>
