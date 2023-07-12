import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { useAppStore } from "../lib/zustand/app-store"

export const DetailJob = () => {
    const [user, setUser] = useAppStore(state => [state.user, state.setUser])
    const API_URL = import.meta.env.VITE_API_URL
    const params = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const dataParam = location.state

    const [job, setJob] = useState({})

    const fetchDetailJob = () => {
        axios.get(`${API_URL}list-jobs/${params.idJob}`, {
            headers: {
                Authorization: 'Bearer ' + user.access_token
            }
        }).then(res => {
            const { data: { data: newJob } } = res
            setJob(newJob)
        }).catch(err => {
            console.log(err)
            setUser('')
        })
    }

    useEffect(() => {
        if (dataParam !== null) {
            setJob(dataParam)
        } else {
            fetchDetailJob()
        }
    }, [dataParam])

    return (
        <div>
            <div className="font-bold text-md text-sky-700 px-4 pt-4 cursor-pointer" onClick={() => navigate('/')}>{`<- Back`}</div>
            {
                job.title ? (
                    <div className="grid justify-items-center grid-cols-1 lg:grid-cols-3 border-4 bg-white border-gray-300 m-4 p-4 gap-4">
                        <div className="col-span-2">
                            <div className="p-2 text-md font-bold text-gray-400">{job.type} / {job.location}</div>
                            <div className="p-2 text-2xl font-bold mb-4 text-gray-600">{job.title}</div>
                            <div
                                dangerouslySetInnerHTML={{ __html: job.description }}
                            />
                        </div>
                        <div className="col-span-1 lg:pt-6 lg:pr-6 order-first lg:order-last">
                            <img src="https://7esl.com/wp-content/uploads/2018/01/list-of-Jobs-and-Occupations.jpeg" alt="" />
                        </div>
                    </div>
                ) : (
                    <div className="p-2 text-2xl font-bold mb-4 text-gray-600">Loading...</div>
                )
            }
        </div>
    )
}
