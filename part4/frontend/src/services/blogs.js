const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await fetch(baseUrl)
  return response.json()
}

const create = async (newBlog) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newBlog)
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to create blog')
  }

  return response.json()
}

export default { getAll, create }
