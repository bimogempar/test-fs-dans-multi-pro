import { Navigate, Outlet } from "react-router-dom"
import { useAppStore } from '../lib/zustand/app-store'

const LayoutUser = () => {
    const username = useAppStore(state => state.username)

    if (username === '') {
        return <Navigate to='/login' replace />
    }

    return (
        <div>
            Navbar
            <Outlet user={username} />
            Footer
        </div>
    )
}

export default LayoutUser