import deepFreeze from 'deep-freeze'
import { describe, expect, it } from 'vitest'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  it('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'NO_MUTATION'
    }
    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  it('should return previous state if action type is unknown', () => {
    const state = initialState
    deepFreeze(state)
    const newState = counterReducer(state, { type: 'UNKNOWN' })
    expect(newState).toEqual(state)
  })

  it('good is incremented', () => {
    const state = initialState
    deepFreeze(state)
    expect(counterReducer(state, { type: 'GOOD' })).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  it('ok is incremented', () => {
    const state = initialState
    deepFreeze(state)
    expect(counterReducer(state, { type: 'OK' })).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  it('bad is incremented', () => {
    const state = initialState
    deepFreeze(state)
    expect(counterReducer(state, { type: 'BAD' })).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  it('reset returns initial state', () => {
    const state = {
      good: 5,
      ok: 2,
      bad: 3
    }
    deepFreeze(state)
    expect(counterReducer(state, { type: 'RESET' })).toEqual(initialState)
  })

  it('does not mutate the original state', () => {
    const state = initialState
    deepFreeze(state)
    counterReducer(state, { type: 'GOOD' })
    counterReducer(state, { type: 'OK' })
    counterReducer(state, { type: 'BAD' })
    counterReducer(state, { type: 'RESET' })
    expect(state).toEqual(initialState)
  })
})
