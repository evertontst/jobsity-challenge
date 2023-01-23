<template>
  <ol :style="{ 'grid-template-rows': rowHeight }">
    <li
      v-for="day in days"
      :key="day.date"
      :class="{
        'calendargrid-date--sun': day.dayOfWeek === 0,
        'calendargrid-date--sat': day.dayOfWeek === 6,
        'calendargrid-date--out': day.month !== currentMonth,
        'calendargrid-date--today': day.date === today
      }"
    >
      <div class="day-wrapper">
        <span>{{ day.formatted }}</span>
        <button 
          v-if="day.events.length > 0"
          class="remove-all"
          @click="removeAll(day.date)"
        >
          <i class="material-icons text-base">delete</i>
        </button>
      </div>
      <div class="event-wrapper">
        <Events 
          v-for="event in day.events"
          :key="event.id"
          :event="event"
          @formVisible="onformVisible" 
          @newEvent="onNewEvent"  />
      </div>
    </li>
    <Reminder 
      v-if="formVisible" 
      :event="newEvent"
      @formVisible="onformVisible"
    />
  </ol>
</template>

<script>
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

export default {
  name: "CalendarGrid",

  components: {
    Events: () => import('~/components/Calendar/Events'),
    Reminder: () => import('~/components/Calendar/Reminder')
  },
  props: {
    currentDate: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      event: null,
      formVisible: false
    }
  },
  computed: {
    events() {
      return this.$store.state.events.calendar.events
    },
    rowHeight() {
      return `repeat(auto-fill, calc((100vh - 70px - 30px - 7px)/${ this.numOfWeeks }))`;
    },
    numOfWeeks() {
      return (this.prevMonthDays.length + this.monthDays.length + this.nextMonthDays.length) / 7;
    },
    days() {
      return [
        ...this.prevMonthDays,
        ...this.monthDays,
        ...this.nextMonthDays
      ];
    },
    today() {
      return dayjs().format("YYYY-MM-DD");
    },
    currentMonth() {
      return this.currentDate.format("M");
    },
    currentYear() {
      return this.currentDate.format("YYYY");
    },
    daysInMonth() {
      return dayjs(this.currentDate).daysInMonth();
    },
    firstCurrMonthDay() {
      return dayjs(`${this.currentYear}-${this.currentMonth}-01`);
    },
    lastCurrMonthDay() {
      return dayjs(`${this.currentYear}-${this.currentMonth}-${this.monthDays.length}`);
    },
    monthDays() {
      const daysArr = [];

      for (let i = 0; i < this.daysInMonth; i++) {
        const date = dayjs(`${this.currentYear}-${this.currentMonth}-${i + 1}`);
        daysArr.push(this.buildDate(date));
      }

      return daysArr;
    },
    prevMonthDays() {
      const prevMonth = this.firstCurrMonthDay.subtract(1, "month");
      const year = prevMonth.year();
      const numOfPrevDays = this.getWeekday(this.firstCurrMonthDay);
      const firstSunday = dayjs(this.monthDays[0].date).subtract(numOfPrevDays, "day").date();
      const prevDaysArr = [];

      for (let i = 0; i < numOfPrevDays; i++) {
        const date = dayjs(`${year}-${prevMonth.month() + 1}-${firstSunday + i}`);
        prevDaysArr.push(this.buildDate(date));
      }

      return prevDaysArr;
    },
    nextMonthDays() {
      const nextMonth = this.firstCurrMonthDay.add(1, "month");
      const year = nextMonth.year();
      const lastDayOfTheMonthWeekday = this.getWeekday(this.lastCurrMonthDay);
      const numOfNextDays = 6 - lastDayOfTheMonthWeekday;
      const nextDaysArr = [];

      for (let i = 0; i < numOfNextDays; i++) {
        const date = dayjs(`${year}-${nextMonth.month() + 1}-${i + 1}`);
        nextDaysArr.push(this.buildDate(date));
      }

      return nextDaysArr;
    }
  },
  methods: {
    onNewEvent(newEvent) {
      this.newEvent = newEvent
    },
    getWeekday(date) {
      return dayjs(date).weekday();
    },
    buildDate(date) {
      return {
        date: date.format("YYYY-MM-DD"),
        formatted: date.format("D"),
        month: date.format("M"),
        dayOfWeek: date.day(),
        events: this.events
          .filter(t => t.date === date.format("YYYY-MM-DD"))
          .sort((a, b) => {
            if (a.hour !== b.hour) {
              return a.hour - b.hour;
            } else {
              return a.minute - b.minute;
            }
          })
      }
    },
    removeAll(dayDate) {
      this.$store.dispatch('events/deleteAllEvent', dayDate)
    },
    onformVisible(data) {
      this.formVisible = data
    },
  }
};
</script>

<style scoped lang="less">
ol {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  list-style: none;
  background-color: #B7B7B7;
  gap: 1px;
  padding: 1px;
  height: calc(100vh - 100px);
  margin: 0;



  li {
    background-color: #fff;

    span {
      .flex;
      margin: 10px;
      font-size: 0.95em;
      width: 30px;
      height: 30px;
    }

    &.calendargrid-date--out {
      background-color: #eee;

      span {
        opacity: .3;
      }
    }
    &.calendargrid-date--sun {
      background-color: #f2f2f2;
      color: #3a6c9c;
    }
    &.calendargrid-date--sat {
      background-color: #f2f2f2;
      color: #3a6c9c;
    }


    &.calendargrid-date--today {
      span {
        background-color: #74B9FF;
        border-radius: 50%;
        color: #fff;
      }
    }

    .event-wrapper {
      padding: 0 5px;
      max-height: calc(100% - 60px);
      overflow-y: auto;
    }

    .day-wrapper {
      .flex(row, space-between);

      .remove-all {
        outline: none;
        background-color: transparent;
        border: 1px solid #000;
        text-align: center;
        text-transform: uppercase;
        font-size: 0.7em;
        border-radius: 50%;
        margin-right: 10px;
        width: 24px;
        height: 24px;
        padding: 0;
        cursor: pointer;
        transition: background-color .3s ease-out;

        &:hover {
          background-color: #74B9FF;
          color: #fff;
        }

        svg {
          height: 12px;
          width: 12px;
        }
      }
    }
  }
}
</style>