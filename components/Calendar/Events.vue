<template>
  <div 
    class="event-chip"
    :style="{ 'background-color': event.color }"
    @click="openEvent(event)"
  >
    <span :style="{ color: textColor }">{{ formattedTime }}</span>
    <span :style="{ color: textColor }" class="event-description">{{ event.description }}</span>
    <button @click.stop="removeEvent(event)">
      <i class="material-icons text-base leading-4" :style="{ color: textColor }">delete</i>
    </button>
  </div>
</template>

<script>
export default {
  name: "EventChallenge",

  props: {
    event: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  },
  computed: {
    formattedTime() {
      return `${this.event.hour.toString().padStart(2, '0')}:${this.event.minute.toString().padStart(2, '0')}`;
    },
    textColor() {
      const color = (this.event.color.charAt(0) === '#') ? this.event.color.substring(1, 7) : this.event.color;
      const r = parseInt(color.substring(0, 2), 16);
      const g = parseInt(color.substring(2, 4), 16);
      const b = parseInt(color.substring(4, 6), 16);
      return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ?
        '#000' : '#fff';
    }
  },
  methods: {
    openEvent(data) {
      this.$emit('newEvent', data)
      this.$emit('formVisible', true)
    },
    removeEvent(event) {
      this.$store.dispatch('events/deleteEvent', event)
    }
  }
};
</script>

<style scoped lang="less">
.event-chip {
  .flex(row, space-between);
  width: 100%;
  height: 25px;
  border: 1px solid #000;
  border-radius: 40px;
  margin-bottom: 3px;
  padding: 0 10px;
  font-size: 0.8em;
  cursor: pointer;

  button {
    outline: none;
    color: #fff;
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    height: 15px;

    svg {
      height: 14px;
      width: 14px;
    }
  }

  .event-description {
    .text-overflow;
    max-width: calc((100vw/7) - 100px);
    margin-right: auto;
    margin-left: 5px;
  }
}
</style>