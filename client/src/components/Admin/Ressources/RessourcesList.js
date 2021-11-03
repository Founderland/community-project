import { useEffect, useState, useContext } from "react"
import AdminContext from "../../../contexts/Admin"
import axios from "axios"

const ressourcesUrl = "/api/ressources/all"

const RessourcesList = ({ folder, reload }) => {
  const [ressources, setRessources] = useState([])
  const { config } = useContext(AdminContext)

  useEffect(() => {
    const getDate = async () => {
      try {
        const { data } = axios.get(ressourcesUrl, config)
        if (data) {
          setRessources(data)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }, [])

  return <div>ressource list {folder}</div>
}

export default RessourcesList
