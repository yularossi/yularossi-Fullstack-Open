import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Paper, Typography, Button, Box, Link } from '@mui/material'

const BlogDetail = ({ blogs, onLike, onRemove, user }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const blog = blogs.find((b) => (b.id || b._id) === id)

  const [likes, setLikes] = useState(blog?.likes || 0)

  if (!blog) {
    return <p>Blog not found</p>
  }

  const handleLike = async () => {
    const updatedLikes = likes + 1
    setLikes(updatedLikes)

    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: updatedLikes
    }

    if (onLike) {
      await onLike(blog.id || blog._id, updatedBlog)
    }
  }

  const normalizeUserId = (user) => {
    if (!user) return null
    if (typeof user === 'string') return user
    return user.id || user._id ? String(user.id || user._id) : null
  }

  const blogUserId = normalizeUserId(blog.user)
  const userId = normalizeUserId(user)

  const canRemove = Boolean(
    onRemove &&
    user &&
    blog.user &&
    (
      (typeof blog.user === 'object' && (
        blog.user.username === user.username ||
        blog.user.name === user.name ||
        (blogUserId && userId && blogUserId === userId)
      )) ||
      (typeof blog.user === 'string' && blogUserId && userId && blogUserId === userId)
    )
  )

  const handleRemove = () => {
    if (onRemove && window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)) {
      onRemove(blog.id || blog._id)
      navigate('/')
    }
  }

  return (
    <Paper sx={{ p: 4, mt: 4, maxWidth: 720, mx: 'auto' }} elevation={3}>
      <Typography variant="h4" component="h2" gutterBottom>
        {blog.title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        by {blog.author}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <Link href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </Link>
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Typography variant="body1">likes: {likes}</Typography>
        {user && (
          <Button variant="contained" size="small" onClick={handleLike}>
            Like
          </Button>
        )}
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Added by {blog.author}
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        {canRemove && (
          <Button variant="contained" color="error" onClick={handleRemove}>
            Remove
          </Button>
        )}
        <Button variant="outlined" onClick={() => navigate('/')}>Back</Button>
      </Box>
    </Paper>
  )
}

export default BlogDetail
