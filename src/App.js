import { useEffect, useReducer, useState } from 'react'
import './App.css'
import { FaPlus } from 'react-icons/fa'
import Nav from './components/nav'
import { addToDB } from './utils/firebase'
import toast from 'react-hot-toast'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from './lib/firebase'
import ProgressDiv from './components/progressDiv'
import { useAuth } from './context/AuthContext'
import TaskList from './components/taskList'
import TaskReducer from './reducers/taskReducer'
import { useModal } from './context/ModalContext'
import Modal from './components/modal'
import { AnimatePresence, motion } from 'framer-motion'

const formVariant = {
  hidden: {
    y: -18,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      type: 'tween',
    },
  },
  exit: {
    x: '80vw',
    opacity: 0,
  },
}

const INITIAL_STATE = {
  task: '',
  addLoading: false,
}

export default function App() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [current, setCurrent] = useState('all')
  const { user } = useAuth()
  const { isModal, inputText, textId, dispatchModal } = useModal()

  const [state, dispatch] = useReducer(TaskReducer, INITIAL_STATE)
  const { task, addLoading } = state

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: 'ADDING' })
    const id = toast.loading(<b>Adding Task...</b>)
    try {
      await addToDB(user?.uid, task)
      toast.success(<b>Task added successfuly</b>, { id })
      dispatch({ type: 'TASKADDED' })
    } catch (error) {
      console.log(error.message)
      toast.error(<b>{error.message}</b>, { id })
      dispatch({ type: 'TASKERROR' })
    }
  }

  useEffect(() => {
    const unsub = onSnapshot(
      query(
        collection(db, `users/${user?.uid}/tasklists`),
        orderBy('timestamp', 'desc')
      ),
      (snapshot) => {
        if (!snapshot.empty) {
          const res = snapshot.docs.map((item) => ({
            ...item.data(),
            id: item.id,
          }))
          setData(res)
        }
        setIsLoading(false)
      }
    )

    return () => unsub()
  }, [])

  return (
    <>
      <div className="topSticky">
        <div className="wrapper">
          <Nav />
          <motion.form
            variants={formVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            onSubmit={handleSubmit}
          >
            <input
              required
              value={task}
              onChange={(e) =>
                dispatch({ type: 'INPUTTASK', payload: e.target.value })
              }
              type="text"
              placeholder="Eg: Add New Feature"
            />
            <button type="submit" disabled={addLoading}>
              {addLoading ? (
                'Adding'
              ) : (
                <>
                  <FaPlus />
                  Add
                </>
              )}
            </button>
          </motion.form>
          <ProgressDiv current={current} setCurrent={setCurrent} />
        </div>
      </div>
      {isLoading ? (
        <p className="loading">Loading..</p>
      ) : (
        <TaskList data={data} current={current} />
      )}
      <footer className="wrapper">
        Developed by{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.canwebe.in"
        >
          CanWeBe!
        </a>
      </footer>
      <AnimatePresence>
        {isModal && (
          <Modal
            dispatchModal={dispatchModal}
            inputText={inputText}
            textId={textId}
            uid={user?.uid}
          />
        )}
      </AnimatePresence>
    </>
  )
}
