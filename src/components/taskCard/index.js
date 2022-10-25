import toast from 'react-hot-toast'
import {
  FaEdit,
  FaRegCheckCircle,
  FaRegCircle,
  FaTrashAlt,
} from 'react-icons/fa'
import { useModal } from '../../context/ModalContext'
import { chnageStatus, deleteTask } from '../../utils/firebase'
import { motion } from 'framer-motion'
import { useEffect, useMemo } from 'react'
import throttle from 'lodash.throttle'

const mainVariant = {
  hidden: {
    x: 100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: '80vw',
    opacity: 0,
  },
}

export default function TaskCard({ item, uid }) {
  const { dispatchModal } = useModal()

  const handleDone = async (id, status) => {
    try {
      await chnageStatus(uid, id, status)
      console.count('run')
    } catch (error) {
      console.log(error.message)
      toast.error(<b>{error.message}</b>)
    }
  }
  const throttleDone = useMemo(
    () => throttle((id, status) => handleDone(id, status), 1500),
    []
  )

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

  useEffect(() => {
    return () => throttleDone.cancel()
  }, [])

  return (
    <motion.div
      variants={mainVariant}
      className={`task ${!item.status ? 'done' : ''}`}
    >
      {item.status ? (
        <FaRegCircle onClick={() => handleDone(item.id, item.status)} />
      ) : (
        <FaRegCheckCircle onClick={() => handleDone(item.id, item.status)} />
      )}
      <p onClick={() => throttleDone(item.id, item.status)}>{item.text}</p>
      {!item.status ? (
        <FaTrashAlt onClick={() => handleDlt(item.id)} className="dltBtn" />
      ) : (
        <FaEdit
          onClick={() =>
            dispatchModal({ type: 'CLICKEDIT', id: item.id, text: item.text })
          }
          className="editBtn"
        />
      )}
    </motion.div>
  )
}
