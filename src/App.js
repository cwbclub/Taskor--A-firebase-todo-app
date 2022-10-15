import { useEffect, useState } from 'react'
import './App.css'
import { FaRegCircle } from 'react-icons/fa'
import AddBtn from './components/addBtn'
import Modal from './components/modal'
import Nav from './components/nav'
import { addToDB, chnageStatus, getTaskList } from './utils/firebase'
import toast from 'react-hot-toast'

export default function App({ user }) {
  const [isModal, setIsModal] = useState(false)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const handleDone = async (id) => {
    try {
      await chnageStatus(user?.uid, id)
      handleData()
    } catch (error) {
      console.log(error.message)
      toast.error(<b>{error.message}</b>)
    }
  }

  const handleData = async () => {
    // setIsLoading(true)
    try {
      const res = await getTaskList(user?.uid)
      setData(res)
      setIsLoading(false)
    } catch (error) {
      console.log(error.message)
      toast.error(<b>{error.message}</b>)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    handleData()
  }, [])

  return (
    <>
      <div className='wrapper mainBody'>
        {console.log(data)}
        <Nav />
        {isLoading ? (
          <p className='loading'>Loading..</p>
        ) : (
          <main>
            {data.length ? (
              <div className='taskList'>
                {data.map((item) => (
                  <div
                    onClick={() => handleDone(item.id)}
                    className={`task ${!item.status ? 'done' : ''}`}
                    key={item.id}
                  >
                    <FaRegCircle />
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className='noTask'>No task added</p>
            )}
          </main>
        )}

        <AddBtn setIsModal={setIsModal} />
        <footer>
          Developed by <a href='https://canwebe.tech'>CanWeBe!</a>
        </footer>
      </div>
      {isModal && (
        <Modal setIsModal={setIsModal} handleData={handleData} user={user} />
      )}
    </>
  )
}
