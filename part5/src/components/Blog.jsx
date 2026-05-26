const Blog = ({ blog }) => {
  return (
    <div className="blog-item">
      <strong>{blog.title}</strong>
      <div>{blog.author}</div>
      <div>likes: {blog.likes}</div>
      <div>
        <a href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </a>
      </div>
    </div>
  )
}

export default Blog
