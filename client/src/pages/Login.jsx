import { Navigate } from "react-router-dom"
import { useAppStore } from "../lib/zustand/app-store"

const Login = () => {
    const username = useAppStore(state => state.username)

    if (username !== '') {
        return <Navigate to='/' replace />
    }

    return (
        <div>Login</div>
    )
}

export default Login