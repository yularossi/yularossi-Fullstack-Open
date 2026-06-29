import { Link } from 'react-router-dom'

const Blogs = ({ user, blogs}) => (
  <div>
    <h2>Blogs</h2>
    {user ? <p>{user.name} logged in</p> : <p>Login to create a new blog</p>}
    
    <ul>
      {blogs.map((blog) => (
        <li key={blog.id || blog._id}>
          <Link to={`/blogs/${blog.id || blog._id}`}>
            {blog.title}{' '}
          </Link>
          by {blog.author}
        </li>
      ))}
    </ul>
  </div>
)

export default Blogs