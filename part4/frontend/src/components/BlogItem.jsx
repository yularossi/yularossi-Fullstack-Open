const BlogItem = ({ blog }) => {
  return (
    <div className="blog-item">
      <div className="blog-title">{blog.title}</div>
      {blog.author && <div className="blog-author">By {blog.author}</div>}
      <a href={blog.url} target="_blank" rel="noopener noreferrer" className="blog-url">
        {blog.url}
      </a>
      <div className="blog-likes">👍 {blog.likes} likes</div>
    </div>
  )
}

export default BlogItem
