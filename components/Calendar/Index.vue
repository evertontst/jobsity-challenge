<template>
  <div>
    <Header :current-date="currentDate" @formVisible="onformVisible" @changeCurrentDate="onchangeCurrentDate" />
    <ol class="header">
      <li v-for="weekday in weekdays" :key="weekday">
        {{ weekday }}
      </li>
    </ol>
    <Grid :current-date="currentDate" />
    <Reminder v-if="formVisible" @formVisible="onformVisible" />
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "CalendarIndex",
  components: {
    Header: () => import('~/components/Calendar/Header'),
    Grid: () => import('~/components/Calendar/Grid'),
    Reminder: () => import('~/components/Calendar/Reminder')
  },
  data () {
    return {
      formVisible: false,
      currentDate: dayjs()
    }
  },
  computed: {
    weekdays() {
      return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    }
  },  
  methods: {
    onformVisible(data) {
      this.formVisible = data
    },
    onchangeCurrentDate(newCurrentDate) {
      this.currentDate = newCurrentDate
    }
  }
};
</script>

<style scoped lang="less">
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