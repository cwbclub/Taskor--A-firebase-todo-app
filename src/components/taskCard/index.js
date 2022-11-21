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
import moment from 'moment'
import { useState } from 'react'

const mainVariant = {
  hidden: {
    x: 200,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      mass: 0.4,
      damping: 8,
    },
  },
  exit: {
    x: '-100vw',
    opacity: 0,
    transition: { ease: 'easeInOut' },
  },
}

export default function TaskCard({ item, uid }) {
  const { dispatchModal } = useModal()
  const [isStatus, setIsStatus] = useState(item?.status || false)

  const handleDone = async (id, status) => {
    try {
      await chnageStatus(uid, id, status)
    } catch (error) {
      console.log(error.message)
      toast.error(<b>{error.message}</b>)
    }
  }
  const handleThrottle = (id, status) => {
    setIsStatus((prev) => !prev)
    throttleDone(id, status)
  }
  const throttleDone = useMemo(
    () => throttle((id, status) => handleDone(id, status), 1400),
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
    <motion.div variants={mainVariant} layout>
      <div className={`task ${!isStatus ? 'done' : ''}`}>
        {isStatus ? (
          <FaRegCircle onClick={() => handleThrottle(item.id, isStatus)} />
        ) : (
          <FaRegCheckCircle onClick={() => handleThrottle(item.id, isStatus)} />
        )}
        <div
          onClick={() => handleThrottle(item.id, isStatus)}
          className="taskContent"
        >
          <p className="text">{item.text}</p>
          <p className="time">
            Modified:{' '}
            {moment.unix(item?.timestamp?.seconds).format('h:mm a, D MMM YY')}
          </p>
        </div>
        {!isStatus ? (
          <FaTrashAlt onClick={() => handleDlt(item.id)} className="dltBtn" />
        ) : (
          <FaEdit
            onClick={() =>
              dispatchModal({ type: 'CLICKEDIT', id: item.id, text: item.text })
            }
            className="editBtn"
          />
        )}
      </div>
    </motion.div>
  )
}
