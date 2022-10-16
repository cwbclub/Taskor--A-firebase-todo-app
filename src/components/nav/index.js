import { signOut } from 'firebase/auth'
import toast from 'react-hot-toast'
import { FaSignOutAlt } from 'react-icons/fa'
import { auth } from '../../lib/firebase'
export default function Nav() {
  const handleClick = async () => {
    const id = toast.loading(<b>Loading...</b>)
    try {
      await signOut(auth)
      toast.success(<b>Signed Out</b>, { id })
    } catch (error) {
      console.log(error.message)
      toast.error(<b>{error.message}</b>, { id })
    }
  }

  return (
    <nav>
      <h1>Taskor</h1>
      <span onClick={handleClick}>
        <FaSignOutAlt /> Logout
      </span>
    </nav>
  )
}
