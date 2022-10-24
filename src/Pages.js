import { Route, Routes, useLocation } from 'react-router-dom'
import Login from './Login'
import App from './App'
import PrivateRoute from './components/privateRoute'
import AuthContextProvider from './context/AuthContext'
import ModalContextProvider from './context/ModalContext'
import { AnimatePresence } from 'framer-motion'

export default function Pages() {
  const location = useLocation()
  return (
    <AuthContextProvider>
      <ModalContextProvider>
        <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.pathname}>
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
        </AnimatePresence>
      </ModalContextProvider>
    </AuthContextProvider>
  )
}
