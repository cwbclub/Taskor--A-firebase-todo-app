import { signInWithPopup, signOut } from 'firebase/auth'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { auth, googleProvider } from './lib/firebase'
import './Login.css'
import { motion } from 'framer-motion'

const mainVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    x: '-70vw',
    opacity: 0,
  },
}

const headerVariant = {
  hidden: {
    y: -30,
    scale: 0.3,
    opacity: 0,
  },
  visible: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
  exit: {
    opacity: 0,
  },
}

const textVariant = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      delay: 0.3,
    },
  },
  exit: {
    opacity: 0,
  },
}
const btnVariant = {
  hidden: {
    y: 30,
    scale: 0.3,
    opacity: 0,
  },
  visible: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      delay: 1,
      duration: 0.7,
    },
  },
  tap: {
    backgroundColor: '#204b77',
    boxShadow: '1px 2px 15px rgba(0, 0, 0, 0.23)',
  },
  exit: {
    opacity: 0,
  },
}

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { user, authReady, dispatch } = useAuth()

  const handleSignin = async () => {
    setIsLoading(true)
    const id = toast.loading(<b>Please wait...</b>)
    try {
      const res = await signInWithPopup(auth, googleProvider)
      if (res) {
        toast.success(<b>Welcome {res.user.displayName}</b>, { id })
        dispatch({ type: 'LOGIN', payload: res.user })
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
  }, [authReady])

  return (
    <div className="loginBg">
      <div className="wrapper loginBody">
        <motion.div
          variants={mainVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          whileTap="tap"
          className="textBox"
        >
          <motion.h1 variants={headerVariant}>Welcome To Taskor</motion.h1>
          <motion.p variants={textVariant}>
            This is an easy to use TODO list app with beautifull UI. It is
            powered by Firebase and built by CanWeBe!
          </motion.p>
          <motion.button
            variants={btnVariant}
            disabled={isLoading}
            onClick={handleSignin}
          >
            {isLoading ? 'Loading..' : 'Get Started'}
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
