import { onAuthStateChanged } from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../lib/firebase'

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        localStorage.setItem('user', JSON.stringify(authUser))
        setUser(authUser)
        console.log('signed in')
      } else {
        localStorage.removeItem('user')
        setUser()
        console.log('Signed out')
      }
    })

    return () => unsubscribe()
  }, [auth])

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}
