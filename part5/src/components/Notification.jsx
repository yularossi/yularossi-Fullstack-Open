const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }

  const className = `notification ${notification.type}`
  return <div className={className}>{notification.message}</div>
}

export default Notification
