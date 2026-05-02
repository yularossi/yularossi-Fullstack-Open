import { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const data = await blogService.getAll()
      setBlogs(data)
      setMessage(null)
    } catch (err) {
      setMessage(err.message)
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  const handleAddBlog = async (newBlog) => {
    try {
      const addedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(addedBlog))
      setMessage('Blog added successfully!')
      setMessageType('success')
    } catch (err) {
      setMessage(err.message)
      setMessageType('error')
    }
  }

  return (
    <div className="container">
      <h1>📚 Bloglist</h1>

      <Notification message={message} type={messageType} />

      <BlogForm onAddBlog={handleAddBlog} />

      {loading ? (
        <p>Loading blogs...</p>
      ) : (
        <BlogList blogs={blogs} />
      )}
    </div>
  )
}

export default App
