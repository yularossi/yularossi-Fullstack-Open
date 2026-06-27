import { Link } from 'react-router-dom'
import BlogForm from './BlogForm.jsx'

const Blogs = ({ user, blogs, addBlog }) => (
  <div>
    <h2>Blogs</h2>
    {user ? <p>{user.name} logged in</p> : <p>Login to create a new blog</p>}
    {user && <BlogForm createBlog={addBlog} />}
    <ul>
      {blogs.map((blog) => (
        <li key={blog.id || blog._id}>
          <Link to={`/blogs/${blog.id || blog._id}`}>
            {blog.title} {blog.author}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

export default Blogs