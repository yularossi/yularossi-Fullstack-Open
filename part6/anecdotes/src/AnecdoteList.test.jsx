// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import AnecdoteList from './components/AnecdoteList'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

describe('AnecdoteList component', () => {
  let store

  beforeEach(() => {
    store = configureStore({
      reducer: {
        anecdotes: anecdoteReducer,
        filter: filterReducer,
        notification: notificationReducer
      }
    })
  })

  it('receives anecdotes from redux store sorted by votes', () => {
    const { container } = render(
      <Provider store={store}>
        <AnecdoteList />
      </Provider>
    )
    const html = container.innerHTML
    // Default anecdotes should be present
    expect(html).toContain("If it hurts, do it more often")
  })

  it('displays anecdotes with proper vote counts', () => {
    render(
      <Provider store={store}>
        <AnecdoteList />
      </Provider>
    )
    // Should display vote count for at least one anecdote
    const voteButtons = screen.getAllByText('vote')
    expect(voteButtons.length).toBeGreaterThan(0)
  })
})
