<template>
  <header>
    <h1>{{ month }}</h1>
    <img src="/logo.svg" alt="Jobsity" title="Jobsity" />
    <div class="calendarheader-actions">
      <button class="calendarheader-button btn-wide btn-flex blue" @click="newReminder">
        <i class="material-icons">calendar_month</i>
        <span>Add Reminder</span>
      </button>
      <button class="calendarheader-button btn-round btn-flex white" @click="prevMonth">
        <i class="material-icons">chevron_left</i>
      </button>
      <button class="calendarheader-button btn-round btn-flex white" @click="nextMonth">
        <i class="material-icons">chevron_right</i>
      </button>
    </div>
  </header>
</template>

<script>
import dayjs from "dayjs"


export default {
  name: "CalendarHeader",
  props: {
    currentDate: {
      type: Object,
      required: true
    }
  },  
  computed: {
    month() {
      return dayjs(this.currentDate).format('MMMM') + ' ' + dayjs(this.currentDate).format('YYYY')
    }
  },  
  methods: {
    nextMonth() {
      const newCurrentDate = dayjs(this.currentDate).add(1, "month");
      this.$emit('changeCurrentDate', newCurrentDate);
    },
    prevMonth() {
      const newCurrentDate = dayjs(this.currentDate).subtract(1, "month");
      this.$emit('changeCurrentDate', newCurrentDate);
    },
    newReminder() {
      this.$emit('formVisible', true);
    }
  }
};
</script>

<style scoped lang="less">
header {
  .flex(row, space-between);
  height: 70px;
  padding: 0 20px;

  h1 {
    margin: 0;
    font-size: 1.7em;
  }

  .calendarheader-actions {
    .flex(row, space-between);

    & > :not(:last-child) {
      margin-right: 10px;
    }

    .calendarheader-button {
      .flex;
      outline: none;
      border: none;
      cursor: pointer;
      text-transform: uppercase;

      &.blue {
        background-color: #74B9FF;
        color: #fff;

        &:hover, &:focus {
          border: 2px solid darken(#74B9FF, 30%);
        }
      }

      &.white {
        background-color: #fff;
      }

      &.btn-wide {
        width: 150px;
        height: 40px;
        border-radius: none;
        background-color:#fff;
        color: #000;

        svg {
          margin-right: 10px;
        }
      }
       &.btn-wide:hover {
        width: 150px;
        height: 40px;
        border-radius: 20px;
        border-color:#000;

        svg {
          margin-right: 10px;
        }
      }

      &.btn-round {
        width: 40px;
        height: 40px;
        border: 1px solid #B7B7B7;
        border-radius: 50%;
      }

      &:hover, &:focus {
        border: 2px solid #000;
      }

      svg {
        width: 17px;
        height: 17px;
      }
    }
  }
}
ol.header  {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  list-style: none;
  padding: 1px;
  color: #f1ffff;
  background-color: #2f74b5;
  margin: 0;
  border-top: 1px solid #B7B7B7;

  li {
    font-weight: bold;
    margin: auto;
  }
}
</style>