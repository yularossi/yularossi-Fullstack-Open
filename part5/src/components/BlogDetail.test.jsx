import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import BlogDetail from './BlogDetail'

const blog = {
  id: '123',
  title: 'Test Blog',
  author: 'Test Author',
  url: 'http://example.com',
  likes: 5,
  user: {
    username: 'creator',
    name: 'Creator User'
  }
}

const renderBlogDetail = ({ user = null, onLike = vi.fn(), onRemove = vi.fn() } = {}) => {
  render(
    <MemoryRouter initialEntries={['/blogs/123']}>
      <Routes>
        <Route
          path="/blogs/:id"
          element={
            <BlogDetail
              blogs={[blog]}
              onLike={onLike}
              onRemove={onRemove}
              user={user}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  )
}

test('shows blog info and likes to unauthenticated users without buttons', () => {
  renderBlogDetail({ user: null })

  expect(screen.getByText('Test Blog')).toBeInTheDocument()
  expect(screen.getByText('http://example.com')).toBeInTheDocument()
  expect(screen.getByText(/likes:\s*5/)).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /like/i })).not.toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /remove/i })).not.toBeInTheDocument()
})

test('shows like button only to authenticated non-creator users', () => {
  renderBlogDetail({ user: { username: 'other', name: 'Other User' } })

  expect(screen.queryByRole('button', { name: /like/i })).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /remove/i })).not.toBeInTheDocument()
})

test('shows remove button only to the creator', () => {
  renderBlogDetail({ user: { username: 'creator', name: 'Creator User' } })

  expect(screen.queryByRole('button', { name: /remove/i })).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /like/i })).toBeInTheDocument()
})
