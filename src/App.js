import { useEffect, useState } from 'react'
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

export default function App() {
  const [addLoading, setAddLoading] = useState(false)
  const [task, setTask] = useState('')
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [current, setCurrent] = useState('all')
  const user = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setAddLoading(true)
    const id = toast.loading(<b>Adding Task...</b>)
    try {
      await addToDB(user?.uid, task)
      toast.success(<b>Task added successfuly</b>, { id })
      setAddLoading(false)
      setTask('')
    } catch (error) {
      console.log(error.message)
      toast.error(<b>{error.message}</b>, { id })
      setAddLoading(false)
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
          <form onSubmit={handleSubmit}>
            <input
              required
              value={task}
              onChange={(e) => setTask(e.target.value)}
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
          </form>
          <ProgressDiv current={current} setCurrent={setCurrent} />
        </div>
      </div>
      <div className="wrapper mainBody">
        {isLoading ? (
          <p className="loading">Loading..</p>
        ) : (
          <main>
            <TaskList data={data} current={current} />
          </main>
        )}
        <footer>
          Developed by <a href="https://canwebe.tech">CanWeBe!</a>
        </footer>
      </div>
    </>
  )
}
