import { useEffect, useState } from "react"
import axios from "axios"

const Home = () => {
    const [jobs, setJobs] = useState([])
    const [tempQuery, setTempQuery] = useState({
        page: 1,
    })
    const [query, setQuery] = useState(tempQuery);
    const [hasMore, setHasMore] = useState(true);

    const handleSearch = () => {
        setQuery({
            page: 1,
            ...(tempQuery.description && { description: tempQuery.description }),
            ...(tempQuery.location && { location: tempQuery.location }),
            ...(tempQuery.full_time && { full_time: tempQuery.full_time }),
        });
    }

    const handleLoadMore = () => {
        setTempQuery((prev) => ({ ...prev, page: prev.page + 1 }))
        setQuery((prev) => ({ ...prev, page: prev.page + 1 }))
    }

    useEffect(() => {
        axios.get('http://localhost:3001/api/v1/list-jobs', {
            params: query,
            headers: {
                Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1LCJlbWFpbCI6ImJpbW9nZW1wYXJAZ21haWwuY29tIn0sImlhdCI6MTY4OTE2NjQ3NiwiZXhwIjoxNjg5MTcwMDc2fQ.7AGov6XoD8uoqcjmS-ckrKwB0H1HzoFrNUxp9pZU-MQ'
            },
        })
            .then(res => {
                const { data: { data: resJobs } } = res
                const newData = resJobs.reduce((acc, cur) => {
                    if (cur !== null) {
                        acc.push(cur);
                    }
                    return acc;
                }, [])

                if (resJobs.length === 0) {
                    setHasMore(false)
                } else {
                    setHasMore(true)
                }

                if (query.page === 1) {
                    setJobs(newData)
                } else {
                    if (hasMore) {
                        setJobs(prev => ([...prev, ...newData]))
                    }
                }
            })
            .catch(err => {
                console.log('this error occurred', err)
                setJobs([])
            })
    }, [query])

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-12 gap-y-6 p-4">
                <div className="flex flex-col space-y-2">
                    <label htmlFor="">Job Description</label>
                    <input
                        className="p-2 border border-2 border-gray-300"
                        type="text"
                        onChange={(e) => {
                            setTempQuery(prev => ({ ...prev, description: e.target.value }))
                        }} />
                </div>
                <div className="flex flex-col space-y-2">
                    <label htmlFor="">Location</label>
                    <input
                        className="p-2 border border-2 border-gray-300"
                        type="text"
                        onChange={(e) => {
                            setTempQuery(prev => ({ ...prev, location: e.target.value }))
                        }}
                    />
                </div>
                <div className="justify-self-start place-self-end space-x-6">
                    <label htmlFor="">Full Time Only</label>
                    <input type="checkbox" />
                    <button onClick={handleSearch} className="bg-gray-500 p-3 text-white rounded-lg font-medium text-lg">Search</button>
                </div>
            </div>

            <div className="grid grid-cols-1 border-4 bg-white border-gray-300 m-4 p-4">
                <div className="p-2 text-3xl font-bold mb-4 text-gray-600">Job List</div>
                <div className="p-2 text-2xl text-sky-600 font-bold">
                    {
                        jobs.length > 0 && jobs.map(obj => (
                            <div key={obj.id} className="flex justify-between border-y-2 p-4">
                                <div>
                                    <div>{obj.title}</div>
                                    <div className="text-sm text-gray-400">{obj.company} - <span className="text-green-600">{obj.type}</span></div>
                                </div>
                                <div className="text-right text-sm">
                                    <div className="text-gray-500">{obj.location}</div>
                                    <div className="text-gray-400">1 day ago</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {
                    hasMore && (
                        <div>
                            <button
                                className="text-white bg-gradient-to-t from-sky-700 to-zinc-100 p-3 rounded-lg font-medium text-xl w-full"
                                onClick={handleLoadMore}
                            >
                                More Jobs
                            </button>
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default Home