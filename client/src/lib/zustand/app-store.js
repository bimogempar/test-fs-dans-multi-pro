import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const AuthStore = set => ({
    user: '',
    setUser: user => set({ user })
})

export const useAppStore = create(persist(AuthStore, {
    name: 'auth'
}));