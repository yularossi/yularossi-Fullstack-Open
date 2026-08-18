import { create } from 'zustand'

export const useAnecdoteStore = create(set => ({
  filter: '',

  setFilter: (filter) => set({ filter }),
}))
