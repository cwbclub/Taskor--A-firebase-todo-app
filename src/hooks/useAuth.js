import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth } from '../lib/firebase'

export default function useAuth() {
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

    return unsubscribe
  }, [auth])

  return user
}
