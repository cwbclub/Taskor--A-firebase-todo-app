import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Loading from '../loading'

export default function PrivateRoute({ children }) {
  const { user, authReady } = useAuth()

  return authReady ? (
    user ? (
      children
    ) : (
      <Navigate replace={true} to="/login" />
    )
  ) : (
    <Loading />
  )
}
