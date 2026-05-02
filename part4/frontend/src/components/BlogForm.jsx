import { useState } from 'react'

const BlogForm = ({ onAddBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim() || !url.trim()) {
      alert('Title and URL are required')
      return
    }

    setIsSubmitting(true)

    await onAddBlog({
      title: title.trim(),
      author: author.trim(),
      url: url.trim(),
      likes: 0
    })

    setTitle('')
    setAuthor('')
    setUrl('')
    setIsSubmitting(false)
  }

  return (
    <div className="form-section">
      <h2>Add a new blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Blog title"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author name"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="url">URL *</label>
          <input
            id="url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            disabled={isSubmitting}
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Blog'}
        </button>
      </form>
    </div>
  )
}

export default BlogForm
