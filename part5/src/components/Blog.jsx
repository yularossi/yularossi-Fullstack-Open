import { useState } from 'react'
import blogService from '../services/blogs.js'

const Blog = ({ blog }) => {

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
  const handleLike = () => {
    setLikes(likes + 1)
    blogService.like(blog._id || blog.id, { 
      title: blog.title, 
      author: blog.author, 
      url: blog.url, 
      likes: likes + 1 
    })
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
