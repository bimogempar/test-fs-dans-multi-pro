import { Navigate } from "react-router-dom"
import { useAppStore } from "../lib/zustand/app-store"
import { shallow } from "zustand/shallow"

const Login = () => {
    const [username, setUsername] = useAppStore(state =>
        [state.username, state.setUsername], shallow
    )

    if (username !== '') {
        return <Navigate to='/' replace />
    }

    return (
        <div>
            <button onClick={() => setUsername('bimogempar')}>Login</button>
        </div>
    )
}

export default Login