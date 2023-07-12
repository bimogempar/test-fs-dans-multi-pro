import { Navigate } from "react-router-dom"
import { useAppStore } from "../lib/zustand/app-store"
import { shallow } from "zustand/shallow"
import { useState } from "react"
import axios from "axios"

const Login = () => {
    const API_URL = import.meta.env.VITE_API_URL
    const [user, setUser] = useAppStore(state =>
        [state.user, state.setUser], shallow
    )

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');

    const handleSubmit = () => {
        axios.post(`${API_URL}login`, {
            email,
            password,
        }).then(response => {
            const { data: { data: dataUser } } = response;
            setUser(dataUser);
        }).catch(err => {
            console.log(err);
            setError('Email atau password salah!')
        })
    }

    if (user !== '') {
        return <Navigate to='/' replace />
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-4/5 sm:w-2/3 md:w-1/3 py-8 space-y-8 border border-4 border-gray-400 rounded-lg">
                <div className="flex justify-center text-bold text-2xl font-medium">Login Page</div>
                <div className="flex justify-center text-bold text-2xl font-medium text-sky-700">Github <span className="font-thin text-sky-700">Jobs</span></div>
                <div className="flex justify-center">
                    <div className="w-1/2 flex flex-col space-y-4 text-md">
                        <label htmlFor="" className="text-lg">Email</label>
                        <input type="text" className="bg-gray-200 border border-gray-400 rounded-md p-2" onChange={(e) => { setError(''); setEmail(e.target.value) }} />
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="w-1/2 flex flex-col space-y-4 text-md">
                        <label htmlFor="" className="text-lg">Password</label>
                        <input type="password" className="bg-gray-200 border border-gray-400 rounded-md p-2" onChange={(e) => { setError(''); setPassword(e.target.value) }} />
                        {error.length > 0 && <div className="text-red-500">{error}</div>}
                    </div>
                </div>
                <div className="flex justify-center">
                    <button onClick={handleSubmit} className="bg-sky-700 text-white w-1/2 p-4 rounded-lg">Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login