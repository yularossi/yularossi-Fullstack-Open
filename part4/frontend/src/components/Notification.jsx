const Notification = ({ message, type }) => {
  if (!message) return null

  const styles = {
    padding: '12px 16px',
    marginBottom: '20px',
    borderRadius: '6px',
    border: type === 'error' ? '1px solid #dc3545' : '1px solid #28a745',
    backgroundColor: type === 'error' ? '#f8d7da' : '#d1e7dd',
    color: type === 'error' ? '#842029' : '#0f5132'
  }

  return <div style={styles}>{message}</div>
}

export default Notification
