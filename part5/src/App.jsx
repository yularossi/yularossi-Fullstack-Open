import { useEffect, useState } from 'react'
import blogService from './services/blogs.js'
import loginService from './services/login.js'
import Blogs from './components/Blogs.jsx'
import BlogDetail from './components/BlogDetail.jsx'
import BlogForm from './components/BlogForm.jsx'
import LoginForm from './components/LoginForm.jsx'
import Notification from './components/Notification.jsx'
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'

const STORAGE_KEY = 'loggedBloglistUser'

const App = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
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
      navigate('/')
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
    navigate('/')
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

  const handleRemove = async (id) => {
    try {
      await blogService.removeBlog(id)
      setBlogs(blogs.filter((blog) => (blog.id || blog._id) !== id))
      showNotification('Blog removed', 'success')
    } catch (error) {
      showNotification('Could not remove blog', 'error')
    }
  }

  return (
    <div className="app">
      <nav>
        <Link to="/">Blogs</Link>{' | '}
        <Link to="/blogForm">New Blog</Link>{' | '}
        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
      <Notification notification={notification} />

      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <LoginForm onLogin={handleLogin} />}
        />
        <Route
          path="/"
          element={
            <Blogs
              user={user}
              blogs={sortedBlogs}
            />
          }
        />
        <Route
          path="/blogForm"
          element={
            user ? (
              <BlogForm createBlog={addBlog} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <BlogDetail
              blogs={sortedBlogs}
              onLike={handleLike}
              onRemove={handleRemove}
              user={user}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
