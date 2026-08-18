import { describe, it, expect, beforeEach } from 'vitest'
import { useAnecdoteStore } from './store'

describe('anecdote store', () => {
  beforeEach(() => {
    // reset store filter
    useAnecdoteStore.setState({ filter: '' })
  })

  it('filter state can be set and retrieved', () => {
    const store = useAnecdoteStore.getState()
    store.setFilter('test')
    
    expect(useAnecdoteStore.getState().filter).toBe('test')
  })

  it('filter state starts empty', () => {
    useAnecdoteStore.setState({ filter: '' })
    expect(useAnecdoteStore.getState().filter).toBe('')
  })
})
