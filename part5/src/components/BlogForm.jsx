import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Paper, TextField, Button, Typography, Box } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
    navigate('/')
  }

  return (
    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
      <Paper sx={{ p: 4, width: '100%', maxWidth: 520 }} elevation={3}>
        <Typography variant="h5" component="h3" gutterBottom>
          Create a new blog
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Author"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="URL"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button type="submit" variant="contained">
              Create
            </Button>
            <Button variant="outlined" onClick={() => navigate('/')}>Cancel</Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default BlogForm
