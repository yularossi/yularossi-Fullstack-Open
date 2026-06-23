import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('submits the correct blog details when a new blog is created', async () => {
  const createBlog = vi.fn()
  render(<BlogForm createBlog={createBlog} />)

  const user = userEvent.setup()
  await user.click(screen.getByText('create a new blog'))

  await user.type(screen.getByLabelText('Title'), 'New Title')
  await user.type(screen.getByLabelText('Author'), 'New Author')
  await user.type(screen.getByLabelText('URL'), 'http://new.url')
  await user.click(screen.getByText('create'))

  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog).toHaveBeenCalledWith({
    title: 'New Title',
    author: 'New Author',
    url: 'http://new.url'
  })
})
