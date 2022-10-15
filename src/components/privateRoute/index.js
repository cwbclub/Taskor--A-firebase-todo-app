import { Navigate } from 'react-router-dom'

export default function PrivateRoute({ children, user }) {
  return user ? children : <Navigate to='/login' />
}
