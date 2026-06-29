import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

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
    if (user.id || user._id) return String(user.id || user._id)
    return null
  }

  const canRemove = Boolean(
    onRemove &&
    user &&
    blog.user &&
    (
      blog.user.username === user.username ||
      blog.user.name === user.name ||
      (normalizeUserId(blog.user) && normalizeUserId(blog.user) === normalizeUserId(user))
    )
  )

  const handleRemove = () => {
    if (onRemove && window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)) {
      onRemove(blog.id || blog._id)
      navigate('/')
    }
  }

  return (
    <div style={{ padding: '10px', border: '1px solid black', borderRadius: '5px', marginTop: '20px' }}>
      <h2>{blog.title}</h2>
      <p>
        <a href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </a>
      </p>
      <p>
        likes: <span>{likes}</span>
        {' '}{user && <button onClick={handleLike}>Like</button>}
      </p>
      <p>Added by {blog.author}</p>
      {canRemove && <button onClick={handleRemove}>Remove</button>} <button onClick={() => navigate('/')}>Back</button>
    </div>
  )
}

export default BlogDetail
