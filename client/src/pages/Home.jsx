import { useAppStore } from "../lib/zustand/app-store"
import { shallow } from "zustand/shallow"

const Home = () => {
    const [username, setUsername] = useAppStore(state =>
        [state.username, state.setUsername], shallow
    )

    return (
        <div>
            <div className="bg-red-200">Home</div>
            <div>username : {username}</div>
            <button onClick={() => setUsername('')}>Logout bro!</button>
        </div>
    )
}

export default Home