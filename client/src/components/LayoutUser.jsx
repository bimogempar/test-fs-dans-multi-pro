import { Navigate, Outlet } from "react-router-dom"
import { useAppStore } from '../lib/zustand/app-store'
import Navbar from "./Navbar"

const LayoutUser = () => {
    const user = useAppStore(state => state.user)

    if (user === '') {
        return <Navigate to='/login' replace />
    }

    return (
        <div className="bg-gray-100 flex flex-col h-screen justify-between">
            <Navbar />
            <div className="mb-auto">
                <Outlet user={user} />
            </div>
        </div>
    )
}

export default LayoutUser