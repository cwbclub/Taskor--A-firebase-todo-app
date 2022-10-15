import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import App from './App'
import PrivateRoute from './components/privateRoute'
import useAuth from './hooks/useAuth'

export default function Pages() {
  const user = useAuth()
  return (
    <Routes>
      <Route
        path='/'
        element={
          <PrivateRoute user={user}>
            <App user={user} />
          </PrivateRoute>
        }
      />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}
