import { signInWithPopup, signOut } from 'firebase/auth'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { auth, googleProvider } from './lib/firebase'
import './Login.css'
import bg from './assets/bg2.svg'

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const user = useAuth()

  const handleSignin = async () => {
    setIsLoading(true)
    const id = toast.loading(<b>Please wait...</b>)
    try {
      const res = await signInWithPopup(auth, googleProvider)
      if (res) {
        toast.success(<b>Welcome {res.user.displayName}</b>, { id })
        navigate('/')
      } else {
        throw new Error('Something went wrong, Try Again!')
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error.message)
      setIsLoading(false)
      toast.error(<b>{error.message}</b>, { id })
    }
  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [])

  return (
    <div className="loginBg" style={{ backgroundImage: `url(${bg})` }}>
      <div className="wrapper loginBody">
        <div className="textBox">
          <h1>Welcome To Taskor</h1>
          <p>
            This is an easy to use TODO list app with beautifull UI. It is
            powered by Firebase and built by CanWeBe!
          </p>
          <button disabled={isLoading} onClick={handleSignin}>
            {isLoading ? 'Loading..' : 'Get Started'}
          </button>
        </div>
      </div>
    </div>
  )
}
