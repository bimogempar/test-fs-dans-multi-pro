import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const AuthStore = set => ({
    username: '',
    setUsername: username => set({ username })
})

export const useAppStore = create(persist(AuthStore, {
    name: 'auth'
}));