import React from 'react'
import { useNotificationStore } from '../notificationStore'

const Notification = () => {
  const notification = useNotificationStore(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  if (!notification) return null

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
