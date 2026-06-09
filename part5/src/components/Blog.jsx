import { useState } from 'react'

const Blog = ({ blog, onLike, onRemove, currentUser }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [detailsVisible, setDetailsVisible] = useState(false)
  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible)
  }
  const detailsStyle = { display: detailsVisible ? '' : 'none' }

  // Implementation for handling like action
  const [likes, setLikes] = useState(blog.likes)
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

  const canRemove = Boolean(
    onRemove &&
    currentUser &&
    blog.user &&
    (
      blog.user.username === currentUser.username ||
      blog.user.name === currentUser.name ||
      blog.user.id === currentUser.id ||
      blog.user._id === currentUser.id ||
      blog.user === currentUser.id
    )
  )

  const handleRemove = () => {
    if (onRemove && window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)) {
      onRemove(blog.id || blog._id)
    }
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        <strong>{blog.title}</strong>
        <button onClick={toggleDetails}>
          {detailsVisible ? 'hide' : 'view'}
        </button>
      </div>
      <div style={detailsStyle}>
        <div>
          <a href={blog.url} target="_blank" rel="noreferrer">
            {blog.url}
          </a>
        </div>
        <div>
          likes: {likes}
          <button onClick={handleLike}>like</button>
        </div>
        <div>{blog.author}</div>
        {canRemove && (
          <button onClick={handleRemove}>remove</button>
        )}
      </div>
    </div>
  )
}

export default Blog
