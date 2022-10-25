import { useState } from 'react'
import toast from 'react-hot-toast'
import { updateTask } from '../../utils/firebase'
import './modal.css'
import { motion } from 'framer-motion'

const mainVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.1 },
  },
  exit: {
    opacity: 0,
  },
}

const modalVariant = {
  hidden: {
    opacity: 0,
    y: 200,
    scale: 0,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0,
    y: 200,
  },
}

export default function Modal({ uid, inputText, textId, dispatchModal }) {
  const [task, setTask] = useState(inputText)
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = (e) => {
    if (e.target.classList.contains('modalBg')) {
      dispatchModal({ type: 'OFF' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (inputText === task) {
      toast.success(<b>Same Task!</b>)
      dispatchModal({ type: 'OFF' })
      return
    }
    if (!task.length) {
      toast.error(<b>Type something!</b>)
      return
    }

    setIsLoading(true)
    try {
      await updateTask(uid, textId, task)
      toast.success(<b>Updated</b>)
      setIsLoading(false)
      dispatchModal({ type: 'OFF' })
    } catch (error) {
      toast.error(<b>{error.message}</b>)
      console.log(error.message)
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      variants={mainVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="modalBg"
      onClick={handleClick}
    >
      <motion.div variants={modalVariant} className="modal">
        <h3>Update Your Task</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            rows={4}
            onChange={(e) => setTask(e.target.value)}
            value={task}
            required
            placeholder="Eg: Buy milk"
          />
          <div className="btnDiv">
            <span onClick={() => dispatchModal({ type: 'OFF' })}>Cancel</span>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Updating' : 'Update'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
