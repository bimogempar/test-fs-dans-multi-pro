import { Navigate, Outlet } from "react-router-dom"
import { useAppStore } from '../lib/zustand/app-store'
import Navbar from "./Navbar"

const LayoutUser = () => {
    const username = useAppStore(state => state.username)

    if (username === '') {
        return <Navigate to='/login' replace />
    }

    return (
        <div className="bg-gray-100 flex flex-col h-screen justify-between">
            <Navbar />
            <div className="mb-auto">
                <Outlet user={username} />
            </div>
        </div>
    )
}

export default LayoutUser