import { createContext, useContext, useState, useCallback } from 'react'

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [notification, setNotificationState] = useState('')

  const setNotification = useCallback((message, duration = 5000) => {
    setNotificationState(message)
    if (duration > 0) {
      setTimeout(() => setNotificationState(''), duration)
    }
  }, [])

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider')
  }
  return context
}
