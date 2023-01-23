export default {
  state() {
    return {
      reminderForm: {
        visible: false,
        entity: {
          id: null,
          dateTime: null,
          city: null,
          description: null,
          color: null
        }
      },

      calendar: {
        events: []
      }
    }
  },

  mutations: {
    createEvent(state, payload) {
        state.calendar.events.push(payload);
    },

    editEvent(state, payload) {
      state.calendar.events = state.calendar.events.filter(function(t) {
        return t.id !== payload.id;
      });
      state.calendar.events.push(payload);
    },
    removeEvent(state, payload) {
        state.calendar.events = state.calendar.events.filter(function(t) {
            return t.id !== payload.id;
        });
    },
    removeAllEvent(state, payload) {
      state.calendar.events = state.calendar.events.filter(function(t) {
          return t.date !== payload;
      });
    },
  },
  actions: {
    addEvent({ commit }, payload) {
        commit('createEvent', payload);
    },

    updateEvent({ commit }, payload) {
        commit('editEvent', payload);
    },

    deleteEvent({ commit }, payload) {
        commit('removeEvent', payload);
    },

    deleteAllEvent({ commit }, payload) {
        commit('removeAllEvent', payload);
    }
  }
}