import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useAnecdoteStore } from './store'

describe('anecdote store', () => {
  beforeEach(() => {
    // reset store
    useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  })

  it('initializes state with anecdotes returned by backend', async () => {
    const mockData = [{ id: 'a1', text: 'mock', votes: 0 }]
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(mockData) })))

    await useAnecdoteStore.getState().initAnecdotes()

    const anecdotes = useAnecdoteStore.getState().anecdotes
    expect(anecdotes).toHaveLength(1)
    expect(anecdotes[0].text).toBe('mock')
  })

  it('voting increases the number of votes for an anecdote', async () => {
    // prepare store with one anecdote
    useAnecdoteStore.setState({ anecdotes: [{ id: 'v1', text: 'vote me', votes: 0 }] })

    // mock PATCH response returning incremented votes
    vi.stubGlobal('fetch', vi.fn((url, opts) => {
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ id: 'v1', text: 'vote me', votes: 1 }) })
    }))

    await useAnecdoteStore.getState().addVote('v1')

    const updated = useAnecdoteStore.getState().anecdotes.find(a => a.id === 'v1')
    expect(updated.votes).toBe(1)
  })
})
