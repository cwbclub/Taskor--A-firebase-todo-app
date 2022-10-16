import { deleteDoc } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { FaRegCheckCircle, FaRegCircle, FaTrashAlt } from 'react-icons/fa'
import { chnageStatus, deleteTask } from '../../utils/firebase'

export default function TaskCard({ item, uid }) {
  const handleDone = async (id, status) => {
    try {
      await chnageStatus(uid, id, status)
    } catch (error) {
      console.log(error.message)
      toast.error(<b>{error.message}</b>)
    }
  }

  const handleDlt = async (id) => {
    const isSure = window.confirm('Are you sure to delete this task?')

    if (isSure) {
      try {
        await deleteTask(uid, id)
        toast.success(<b>Deleted</b>)
      } catch (error) {
        toast.error(<b>{error.message}</b>)
        console.log(error.message)
      }
    }
  }
  return (
    <div className={`task ${!item.status ? 'done' : ''}`}>
      {item.status ? (
        <FaRegCircle onClick={() => handleDone(item.id, item.status)} />
      ) : (
        <FaRegCheckCircle onClick={() => handleDone(item.id, item.status)} />
      )}
      <p onClick={() => handleDone(item.id, item.status)}>{item.text}</p>
      {!item.status && (
        <FaTrashAlt onClick={() => handleDlt(item.id)} className="dltBtn" />
      )}
    </div>
  )
}
