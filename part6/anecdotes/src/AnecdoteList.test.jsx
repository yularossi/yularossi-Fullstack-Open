// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AnecdoteList from './components/AnecdoteList'
import { useAnecdoteStore } from './store'
import { NotificationProvider } from './NotificationContext'
import * as hooks from './hooks'

describe('AnecdoteList component', () => {
  let queryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    })
    useAnecdoteStore.setState({ filter: '' })
  })

  it('receives anecdotes from the store sorted by votes', () => {
    const a1 = { id: '1', text: 'low', votes: 1 }
    const a2 = { id: '2', text: 'high', votes: 5 }
    const anecdotes = [a1, a2]

    vi.spyOn(hooks, 'useAnecdotes').mockReturnValue({
      data: anecdotes,
      isLoading: false,
      isError: false,
    })
    vi.spyOn(hooks, 'useVoteAnecdote').mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    })
    vi.spyOn(hooks, 'useDeleteAnecdote').mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    })

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <AnecdoteList />
        </NotificationProvider>
      </QueryClientProvider>
    )
    const html = container.innerHTML
    const posHigh = html.indexOf('high')
    const posLow = html.indexOf('low')
    expect(posHigh).toBeLessThan(posLow)
  })

  it('receives a properly filtered list of anecdotes', () => {
    const a1 = { id: '1', text: 'apple', votes: 0 }
    const a2 = { id: '2', text: 'banana', votes: 0 }
    const anecdotes = [a1, a2]
    useAnecdoteStore.setState({ filter: 'app' })

    vi.spyOn(hooks, 'useAnecdotes').mockReturnValue({
      data: anecdotes,
      isLoading: false,
      isError: false,
    })
    vi.spyOn(hooks, 'useVoteAnecdote').mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    })
    vi.spyOn(hooks, 'useDeleteAnecdote').mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    })

    render(
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <AnecdoteList />
        </NotificationProvider>
      </QueryClientProvider>
    )
    const apples = screen.getAllByText('apple')
    expect(apples.length).toBeGreaterThan(0)
    expect(screen.queryByText('banana')).toBeNull()
  })
})
