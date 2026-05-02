import { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/blogs')
      if (!response.ok) throw new Error('Failed to fetch blogs')
      const data = await response.json()
      setBlogs(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAddBlog = async (newBlog) => {
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlog)
      })

      if (!response.ok) throw new Error('Failed to create blog')
      
      const addedBlog = await response.json()
      setBlogs([...blogs, addedBlog])
      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="container">
      <h1>📚 Bloglist</h1>
      
      {error && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          Error: {error}
        </div>
      )}

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
