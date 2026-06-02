import { useState } from 'react'
import blogService from '../services/blogs.js'

const Blog = ({ blog, onLike }) => {

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
      </div>
    </div>
  )
}

export default Blog
