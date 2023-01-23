import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { mutations, state } from '@/store/events.js'

describe('Jobsity Challenge', () => {
  const createStore = () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const store = new Vuex.Store({ state, mutations })
    return { store }
  }

  it('Add a reminder', () => { 
  });
  it('Check reminder have in the max 30 chars', () => {
  });
})
