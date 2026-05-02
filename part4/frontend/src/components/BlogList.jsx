const BlogList = ({ blogs }) => {
  if (blogs.length === 0) {
    return (
      <div className="empty-state">
        <p>No blogs yet. Create one above! 📝</p>
      </div>
    )
  }

  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <div key={blog.id} className="blog-item">
          <div className="blog-title">{blog.title}</div>
          {blog.author && <div className="blog-author">By {blog.author}</div>}
          <a href={blog.url} target="_blank" rel="noopener noreferrer" className="blog-url">
            {blog.url}
          </a>
          <div className="blog-likes">
            👍 {blog.likes} likes
          </div>
        </div>
      ))}
    </div>
  )
}

export default BlogList
