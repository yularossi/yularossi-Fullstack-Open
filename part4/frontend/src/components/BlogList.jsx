import BlogItem from './BlogItem'

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
        <BlogItem key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogList
