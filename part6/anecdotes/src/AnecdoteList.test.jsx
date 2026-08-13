// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import AnecdoteList from './components/AnecdoteList'
import { useAnecdoteStore } from './store'

describe('AnecdoteList component', () => {
  beforeEach(() => {
    useAnecdoteStore.setState({ filter: '' })
  })

  it('receives anecdotes from the store sorted by votes', () => {
    const a1 = { id: '1', text: 'low', votes: 1 }
    const a2 = { id: '2', text: 'high', votes: 5 }
    useAnecdoteStore.setState({ anecdotes: [a1, a2] })

    const { container } = render(<AnecdoteList />)
    const html = container.innerHTML
    const posHigh = html.indexOf('high')
    const posLow = html.indexOf('low')
    expect(posHigh).toBeLessThan(posLow)
  })

  it('receives a properly filtered list of anecdotes', () => {
    const a1 = { id: '1', text: 'apple', votes: 0 }
    const a2 = { id: '2', text: 'banana', votes: 0 }
    useAnecdoteStore.setState({ anecdotes: [a1, a2], filter: 'app' })

    render(<AnecdoteList />)
    const apples = screen.getAllByText('apple')
    expect(apples.length).toBeGreaterThan(0)
    expect(screen.queryByText('banana')).toBeNull()
  })
})
