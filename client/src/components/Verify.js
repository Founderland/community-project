import { useParams } from "react-router-dom"

const Verify = () => {
  const { token } = useParams()
  return <div>Verified {token}</div>
}

export default Verify
