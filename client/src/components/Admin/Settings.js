import axios from 'axios'
import { useEffect, useState } from 'react'
import ListWidget from './ListWidget'

const usersAPI = '/api/users/all'

const Settings = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [modalMessage, setModalMessage] = useState({})
    const [modal, setModal] = useState(false)

    useEffect(() => {
        axios
            .get(usersAPI)
            .then((res) => {
                console.log(res.data)
                const result = {
                    header: [
                        { title: 'Name', key: 'name', style: '' },
                        { title: 'Name', key: 'name', style: '' },
                        { title: 'Name', key: 'name', style: '' },
                        { title: 'Name', key: 'name', style: '' },
                    ],
                }
                result.data = res.data
                setData(result)
            })
            .catch((err) => {
                setModalMessage(err)
                setModal(true)
            })
    }, [])

    return (
        <div>
            {loading && 'Loading'}
            {!loading && <ListWidget title="Users" data={data} />}
        </div>
    )
}

export default Settings
