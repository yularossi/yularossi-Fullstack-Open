import { useState } from 'react'

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
          likes: {blog.likes}
          <button>like</button>
        </div>
        <div>{blog.author}</div>
      </div>
    </div>
  )
}

export default Blog
