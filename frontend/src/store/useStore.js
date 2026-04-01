import { create } from 'zustand'
import api from '../api/client'

const useStore = create((set, get) => ({
  user: null,
  isLoggedIn: false,

  setUser: (user) => set({ user, isLoggedIn: !!user }),

  logout: () => {
    localStorage.removeItem('g_access')
    localStorage.removeItem('g_refresh')
    set({ user: null, isLoggedIn: false })
  },

  fetchMe: async () => {
    try {
      const { data } = await api.get('/progress/me')
      set({ user: data, isLoggedIn: true })
    } catch {
      get().logout()
    }
  },

  addXP: (amount, newLevel) => {
    set((state) => ({
      user: state.user ? {
        ...state.user,
        xp: newLevel ? 0 : (state.user.xp || 0) + amount,
        total_xp: (state.user.total_xp || 0) + amount,
        level: newLevel || state.user.level,
      } : state.user
    }))
  },
}))

export default useStore
