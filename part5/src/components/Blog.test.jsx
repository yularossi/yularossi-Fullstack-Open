import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders blog title and author but not url or likes by default', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://example.com',
    likes: 5,
    user: { username: 'tester' }
  }

  render(<Blog blog={blog} />)

  expect(screen.getByText('Test Blog')).toBeDefined()
  expect(screen.getByText('Test Author')).toBeDefined()
  expect(screen.queryByText('http://example.com')).not.toBeInTheDocument()
  expect(screen.queryByText('likes:')).not.toBeInTheDocument()
})

test('shows url and likes when view button is clicked', async () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://example.com',
    likes: 5,
    user: { username: 'tester' }
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  await user.click(screen.getByText('view'))

  expect(screen.getByText('http://example.com')).toBeDefined()
  expect(screen.getByText('likes:')).toBeDefined()
  expect(screen.getByText('5')).toBeDefined()
})

test('calls onLike twice when like button is clicked twice', async () => {
  const blog = {
    id: '123',
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://example.com',
    likes: 5,
    user: { username: 'tester' }
  }
  const mockHandler = vi.fn()

  render(<Blog blog={blog} onLike={mockHandler} />)

  const user = userEvent.setup()
  await user.click(screen.getByText('view'))
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler).toHaveBeenCalledTimes(2)
})
