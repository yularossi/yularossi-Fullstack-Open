import { create } from 'zustand'
import { shallow } from 'zustand/shallow'

// Flat store: numeric counts at top-level and named action functions.
export const useStatsStore = create(set => ({
  all: 0,
  good: 0,
  bad: 0,
  neutral: 0,
  average: 0,
  positive: 0,

  // action functions (named addX to avoid colliding with numeric keys)
  addGood: () => set(state => {
    const all = state.all + 1
    const good = state.good + 1
    const bad = state.bad
    return {
      all,
      good,
      average: (good - bad) / all,
      positive: (good / all) * 100,
    }
  }),

  addBad: () => set(state => {
    const all = state.all + 1
    const bad = state.bad + 1
    const good = state.good
    return {
      all,
      bad,
      average: (good - bad) / all,
      positive: (good / all) * 100,
    }
  }),

  addNeutral: () => set(state => {
    const all = state.all + 1
    const neutral = state.neutral + 1
    const good = state.good
    const bad = state.bad
    return {
      all,
      neutral,
      average: (good - bad) / all,
      positive: (good / all) * 100,
    }
  }),
}))
