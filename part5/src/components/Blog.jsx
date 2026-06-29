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

  const normalizeUserId = (user) => {
    if (!user) return null
    return String(user.id || user._id || user)
  }

  const canRemove = Boolean(
    onRemove &&
    currentUser &&
    blog.user &&
    (
      blog.user.username === currentUser.username ||
      blog.user.name === currentUser.name ||
      normalizeUserId(blog.user) === normalizeUserId(currentUser)
    )
  )

  const handleRemove = () => {
    if (onRemove && window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)) {
      onRemove(blog.id || blog._id)
    }
  }

  return (
    <div style={blogStyle} className="blog">
      <div className="blog-summary">
        <span className="blog-title">{blog.title}</span>
        <span className="blog-author">{blog.author}</span>
        <button className="view-button" onClick={toggleDetails}>
          {detailsVisible ? 'hide' : 'view'}
        </button>
      </div>
      {detailsVisible && (
        <div className="blog-details">
          <div className="blog-url">
            <a href={blog.url} target="_blank" rel="noreferrer">
              {blog.url}
            </a>
          </div>
          <div className="blog-likes">
            likes: <span className="like-count">{likes}</span>
            <button className="like-button" onClick={handleLike}>like</button>
          </div>
          <div className="blog-author-detail">{blog.author}</div>
          {canRemove && (
            <button className="remove-button" onClick={handleRemove}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
