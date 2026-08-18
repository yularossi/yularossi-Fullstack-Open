import { setNotification, clearNotification } from '../reducers/notificationReducer'

let timeoutId = null

export const showNotification = (message, duration = 5000) => (dispatch) => {
  // Clear any existing timeout
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
  
  // Set the notification
  dispatch(setNotification(message))
  
  // Auto-clear after duration
  timeoutId = setTimeout(() => {
    dispatch(clearNotification())
    timeoutId = null
  }, duration)
}
