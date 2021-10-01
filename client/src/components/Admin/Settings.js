import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import ListWidget from './ListWidget'
import Loading from '../Loading'
import AdminContext from '../../contexts/Admin'
import Modal from '../Modal'

const usersAPI = '/api/users/all'

const Settings = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const { modalMessage, setModal, setModalMessage } = useContext(AdminContext)
  useEffect(() => {
    axios
      .get(usersAPI)
      .then((res) => {
        let result = {
          header: [
            { title: 'Name', key: 'name', style: '' },
            { title: 'Email', key: 'email', style: '' },
            { title: 'Role', key: 'role', style: '' },
            { title: 'Added on', key: 'date', style: '' },
            { title: 'Actions', key: '-', style: '' },
          ],
        }
        result = { ...result, ...res.data }
        setModalMessage({
          title: 'Success',
          message: 'Successfully loaded the info from DB',
        })
        setModal(true)
        setData(result)
        setLoading(false)
      })
      .catch((err) => {
        setModalMessage({
          title: 'Error loading the database set',
          message: err,
        })
        setModal(true)
      })
  }, [])

  return (
    <div className="flex flex-col justify-center w-full">
      <Modal message={modalMessage} />
      {loading && <Loading />}
      {!loading && <ListWidget title="Users" data={data} />}
    </div>
  )
}

export default Settings
