import { describe, it, expect } from 'vitest'
import anecdoteReducer, { voteAnecdote, addAnecdote } from './reducers/anecdoteReducer'
import filterReducer, { setFilter } from './reducers/filterReducer'
import notificationReducer, { setNotification, clearNotification } from './reducers/notificationReducer'

describe('anecdote reducer', () => {
  const initialState = [
    {
      content: 'If it hurts, do it more often.',
      id: 1,
      votes: 0
    },
    {
      content: 'Adding manpower to a late software project makes it later!',
      id: 2,
      votes: 0
    }
  ]

  it('should increase vote count', () => {
    const state = initialState
    const newState = anecdoteReducer(state, voteAnecdote(1))
    expect(newState[0].votes).toBe(1)
  })

  it('should add a new anecdote', () => {
    const state = initialState
    const newState = anecdoteReducer(state, addAnecdote('This is a new anecdote'))
    expect(newState).toHaveLength(3)
    expect(newState[2].content).toBe('This is a new anecdote')
    expect(newState[2].votes).toBe(0)
  })

  it('should not mutate original state', () => {
    const state = [...initialState]
    anecdoteReducer(state, voteAnecdote(1))
    expect(state[0].votes).toBe(0)
  })
})

describe('filter reducer', () => {
  it('should initialize with empty string', () => {
    const action = { type: 'UNKNOWN' }
    const newState = filterReducer(undefined, action)
    expect(newState).toBe('')
  })

  it('should set filter value', () => {
    const action = setFilter('test')
    const newState = filterReducer('', action)
    expect(newState).toBe('test')
  })

  it('should replace filter value', () => {
    const action = setFilter('new filter')
    const newState = filterReducer('old filter', action)
    expect(newState).toBe('new filter')
  })
})

describe('notification reducer', () => {
  it('should initialize with empty string', () => {
    const action = { type: 'UNKNOWN' }
    const newState = notificationReducer(undefined, action)
    expect(newState).toBe('')
  })

  it('should set notification message', () => {
    const action = setNotification('Test message')
    const newState = notificationReducer('', action)
    expect(newState).toBe('Test message')
  })

  it('should clear notification', () => {
    const action = clearNotification()
    const newState = notificationReducer('Test message', action)
    expect(newState).toBe('')
  })
})
