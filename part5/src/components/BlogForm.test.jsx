import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('submits the correct blog details when a new blog is created', async () => {
  const createBlog = vi.fn()
  render(
    <MemoryRouter>
      <BlogForm createBlog={createBlog} />
    </MemoryRouter>
  )

  const user = userEvent.setup()

  await user.type(screen.getByLabelText('Title'), 'New Title')
  await user.type(screen.getByLabelText('Author'), 'New Author')
  await user.type(screen.getByLabelText('URL'), 'http://new.url')
  await user.click(screen.getByRole('button', { name: /create/i }))

  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog).toHaveBeenCalledWith({
    title: 'New Title',
    author: 'New Author',
    url: 'http://new.url'
  })
})
