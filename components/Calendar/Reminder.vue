<template>
  <div class="modal-blockout">
    <div class="modal-body">
      <div class="header">
        <h1 v-if="newEvent === null">New Reminder</h1>
        <h1 v-else>Edit Reminder</h1>
      </div>
      <form v-if="event === null">
        <div class="input-wrapper">
          <div class="input-middle">
            <span class="text-base">Date/Time</span>
            <date-picker 
              v-model="dateTime"
              type="datetime"
              placeholder="Select date/time"
            />
            <p v-if="validationChecks.dateTime && !dateTime" class="text-red-600">{{ validationChecks.dateTime }}</p>
          </div>
          <div class="input-middle">
            <span class="text-base">
              <img 
                v-if="hasData && !loading"
                :src="handleWeatherIcon(weatherIcon)"
                class="-top-4 ml-9 absolute float-left"
                :alt="weatherDescription"
                :title="weatherDescription"
              />
              City
            </span>
            
            <input
              v-model.trim="city"
              type="text"
              placeholder="Enter the city"
              data-field="city"
              class="text-base"
            />
          </div>
        </div>
        <div class="input-wrapper">
          <span class="text-base">Description</span>
          <div class="color-wrapper">
            <Swatches
              v-model="color"
              shapes="squares"
              swatch-size="24"
              :trigger-style="{ width: '24px', height: '24px', border: '1px solid #000',  marginTop: '0.5rem', position: 'absolute' }"
              :swatch-style="{ width: '24px', height: '24px', float: 'left' }"
              :wrapper-style="{ width: '500px', marginLeft: '20px', marginTop: '-0.20rem' }"
              class="relative z-10"
            />
          </div>
          <input
            v-model.lazy="description"
            type="text"
            maxlength="30"
            class="pl-10 text-base relative z-0 float-left"
            placeholder="Reminder description"
            data-field="description"
          />
          <p v-if="validationChecks.description && !description" class="text-red-600">{{ validationChecks.description }}</p>
        </div>
        <div class="form-footer">
          <button type="submit" class="cancel-btn" @click.prevent="cancel">
            Cancel
          </button>
          <button type="submit" class="save-btn" @click.prevent="save">
            Save
          </button>
        </div>
      </form>
      <form v-else-if="event.id">
        <div class="input-wrapper">
          <div class="input-middle">
            <span class="text-base">Date/Time</span>
            <date-picker 
              v-model="editEvent.dateTime"
              type="datetime"
              placeholder="Select date/time"
            />
          </div>
          <div class="input-middle">
            <span class="text-base">
              <img 
                v-if="hasData && !loading"
                :src="handleWeatherIcon(weatherIcon)"
                class="-top-4 ml-9 absolute float-left"
                :alt="weatherDescription"
                :title="weatherDescription"
              />
              City
            </span>
            
            <input
              v-model.trim="editEvent.city"
              type="text"
              placeholder="Enter the city"
              data-field="city"
              class="text-base"
            />
          </div>
        </div>
        <div class="input-wrapper">
          <span class="text-base">Description</span>
          <div class="color-wrapper">
          <Swatches
            v-model="editEvent.color"
            shapes="squares"
            swatch-size="24"
            :trigger-style="{ width: '24px', height: '24px', border: '1px solid #000',  marginTop: '0.5rem', position: 'absolute' }"
            :swatch-style="{ width: '24px', height: '24px', float: 'left' }"
            :wrapper-style="{ width: '500px', marginLeft: '20px', marginTop: '-0.20rem' }"
            class="relative z-10"
          />

          
        </div>
          <input
            v-model.lazy="editEvent.description"
            type="text"
            maxlength="30"
            class="pl-10 text-base relative z-0 float-left"
            placeholder="Reminder description"
            data-field="description"
          />
        </div>
        <div class="form-footer">
          <button type="submit" class="cancel-btn" @click.prevent="cancel">
            Cancel
          </button>
          <button type="submit" class="save-btn" @click.prevent="edit(editEvent)">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Swatches from "vue-swatches";
import dayjs from "dayjs";

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

import WeatherAPI from '@/api/weather.api'

export default {
  name: "ReminderForm",
  components: {
    DatePicker,
    Swatches
  },
  props: {
    event: {
      type: Object,
      required: false,
      default: null
    },
  },  
  data() {
    return {
      city: null,
      color: null,
      dateTime: null,
      description: null,
      editEvent: {},
      weatherIcon: null,
      weatherDescription: null,
      loading: false,
      status: null,
      validationChecks: {
        dateTime: null,
        description: null
      }
    };
  },
  computed: {
    hasData() {
      return !!this.dateTime && !!this.city;
    }
  },
  watch: {
    dateTime: {
      immediate: true,
      handler () {
        this.onChange()
      }
    },
    city: {
      immediate: true,
      handler () {
        this.onChange();
      }
    }
  },
  created() {
    this.WeatherAPI = new WeatherAPI();
    this.throttle = null;
    if(this.event) {
      this.editEvent = {...this.event}
    }
  },
  methods: {
    cancel() {
      this.$emit('formVisible', false);
    },
    deb(func) {
      clearTimeout(this.throttle);
      this.throttle = setTimeout(func, 500);
    },
    handleWeatherIcon(icon) {
      return `https://openweathermap.org/img/w/${icon}.png`;
    }, 
    async getForecast() {
      const response = await this.WeatherAPI.get(this.city, this.dateTime);
      this.weatherIcon = response.icon 
      this.weatherDescription = response.description
      this.loading = false
    },
    onChange() {
      if (!this.dateTime || !this.city) return false;

      this.loading = true
      this.deb(() => {
        this.getForecast();
      });
    },
    save() {
      if (!this.dateTime && !this.description) {
        this.validationChecks.dateTime = "required";
        this.validationChecks.description = "required";
        return false
      }
      if (!this.dateTime ) {
        this.validationChecks.dateTime = "required";
        return false
      }
      if (!this.description) {
        this.validationChecks.description = "required";
        return false
      }
      if (this.description && this.description.length > 30) {
        this.validationChecks.description = "max 30 characters";
        return false
      } 
      
      const parsedDate = dayjs(this.dateTime);

      const newEvent = {
        id: Math.random().toString(36).substr(2, 9),
        dateTime: this.dateTime,
        date: parsedDate.format("YYYY-MM-DD"),
        hour: parsedDate.format("HH"),
        minute: parsedDate.format("mm"),
        city: this.city,
        description: this.description,
        color: this.color || "#ffffff",
      };

      this.$store.dispatch('events/addEvent', newEvent)
      this.$emit('formVisible', false);
    },
    edit(edit) {
      const parsedDate = dayjs(edit.dateTime);

      const newEvent = {
        id: edit.id,
        dateTime: edit.dateTime,
        date: parsedDate.format("YYYY-MM-DD"),
        hour: parsedDate.format("HH"),
        minute: parsedDate.format("mm"),
        city: edit.city,
        description: edit.description,
        color: edit.color || "#ffffff",
      };

      this.$store.dispatch('events/updateEvent', newEvent)
      this.$emit('formVisible', false)
    }
  },
};
</script>

<style scoped lang="less">
.modal-blockout {
  position: fixed;
  background-color: #00000066;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  top: 0;
  left: 0;

  .modal-body {
    .flex(column, flex-start);
    position: absolute;
    width: 70%;
    max-width: 600px;
    height: 40%;
    min-height: 400px;
    background-color: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #D3D3D3;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);;
    border-radius: 15px;

    .header {
      .flex(row, space-between);
      padding: 40px;
      width: 100%;

      h1 {
        font-size: 1.7em;
        margin: 0;
        width: 100%;
      }

      .color-wrapper {
        .flex(row);
        height: 40px;
        border-radius: 30px;
        border: 1px solid #B7B7B7;
        padding: 0 12px;

        .vue-swatches {
          height: 24px;
          width:24px;
          margin-right: 10px;
        }
      }
    }

    form {
      .flex(column);
      flex: 1;
      width: 100%;
      padding: 0 40px 40px;
      font-size: 0.85rem;

      span {
        display: block;
        text-transform: uppercase;
        color: #74B9FF;
      }
        
      .input-wrapper {
        width: 100%;
        height: 50px;
        position: relative;

        &:not(:last-child) {
          margin-bottom: 25px;
        }

        &.modal-footer {
          margin-top: auto;
        }
        input {
          border: none;
          border-bottom: 1px solid #000;
          width: 100%;
          outline: none;
          height: 40px;

          &:focus {
            border-bottom: 1px solid #74B9FF;
          }
        }
        .validation {
          position: absolute;
          right: 0;
          top: 50%;
          border: 1px solid #e74c3c;
          padding: 2px 4px;
          color: #e74c3c;
          font-size: 1em;
          text-transform: uppercase
        }
      }
      .input-middle {
        width: 50%;
        height: 50px;
        font-size: 0.7em;
        float: left;
      }

      .form-footer {
        .flex(row, space-between);
        width: 100%;
        margin-top: auto;
        height: 55px;

        button {
          outline: none;
          border: none;
          cursor: pointer;
          text-transform: uppercase;
          width: 100px;
          height: 40px;
          border-radius: 20px;

          &.save-btn {
            background-color: #74B9FF;
            color: #fff;
          }

          &.cancel-btn {
            border: 2px solid #000;
            background-color: #fff;
          }

          &:hover,
          &:focus {
            border: 2px solid darken(#74B9FF, 30%);
          }
        }
      }
    }
  }
}
.vdatetime {
  .vdatetime-input {
    width: 100%;
    height: 40px;
    cursor: pointer;
    border: none;
    border-bottom: 1px solid #000;
  }
}
.vdatetime-overlay {
  border-radius: 15px;
  background-color: #00000066;
}
.input-city {
  margin-top:1rem;
}
</style>