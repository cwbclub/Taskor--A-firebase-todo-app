import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import App from './App'
import PrivateRoute from './components/privateRoute'
import AuthContextProvider from './context/AuthContext'

export default function Pages() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthContextProvider>
  )
}
