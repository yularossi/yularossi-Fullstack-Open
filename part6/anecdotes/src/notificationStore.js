import { create } from 'zustand'

export const useNotificationStore = create((set) => ({
  notification: '',
  setNotification: (message, time = 5000) => {
    set({ notification: message })
    if (time > 0) {
      setTimeout(() => set({ notification: '' }), time)
    }
  }
}))
