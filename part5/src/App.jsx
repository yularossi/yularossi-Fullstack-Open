import { useEffect, useState } from 'react'
import blogService from './services/blogs.js'
import loginService from './services/login.js'
import Blog from './components/Blog.jsx'
import BlogForm from './components/BlogForm.jsx'
import LoginForm from './components/LoginForm.jsx'
import Notification from './components/Notification.jsx'

const STORAGE_KEY = 'loggedBloglistUser'

const App = () => {
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [blogs, setBlogs] = useState([])
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(STORAGE_KEY)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (!user) return

    blogService.getAll().then((blogs) => {
      setBlogs(blogs)
    })
  }, [user])

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      showNotification(`Welcome ${user.name}`, 'success')
    } catch (error) {
      showNotification('Wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(STORAGE_KEY)
    setUser(null)
    setBlogs([])
    blogService.setToken(null)
    showNotification('Logged out', 'success')
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      showNotification(`A new blog '${returnedBlog.title}' by ${returnedBlog.author} added`, 'success')
    } catch (error) {
      showNotification('Could not create blog', 'error')
    }
  }

  const handleLike = async (id, updatedBlog) => {
    try {
      const returnedBlog = await blogService.like(id, updatedBlog)
      setBlogs(blogs.map((blog) => (blog.id === returnedBlog.id ? returnedBlog : blog)))
    } catch (error) {
      showNotification('Could not update likes', 'error')
    }
  }

  if (!user) {
    return (
      <div className="app">
        <h2>Log in to application</h2>
        <Notification notification={notification} />
        <LoginForm onLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div className="app">
      <h2>Blogs</h2>
      <Notification notification={notification} />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <BlogForm createBlog={addBlog} />
      <div className="blog-list">
        {sortedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} onLike={handleLike} />
        ))}
      </div>
    </div>
  )
}

export default App
