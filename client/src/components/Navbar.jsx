import { shallow } from "zustand/shallow"
import { useAppStore } from "../lib/zustand/app-store"

const Navbar = () => {
    const [setUser, user] = useAppStore(state => [state.setUser, state.user], shallow)
    return (
        <div className="bg-sky-700 p-4 flex justify-between items-center px-5">
            <div className="text-white font-bold text-4xl">Github <span className="font-thin">Jobs</span></div>
            {user !== '' &&
                <div className="flex space-x-4">
                    <div className="font-medium text-white text-lg">{user.email}</div>
                    <div onClick={() => setUser('')} className="font-thin text-white text-lg cursor-pointer">Logout</div>
                </div>
            }
        </div>
    )
}

export default Navbar