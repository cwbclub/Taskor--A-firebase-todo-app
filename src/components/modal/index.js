import { useState } from 'react'
import toast from 'react-hot-toast'
import { addToDB } from '../../utils/firebase'
import './modal.css'

export default function Modal({ setIsModal, user, handleData }) {
  const [task, setTask] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const id = toast.loading(<b>Adding Task...</b>)
    try {
      await addToDB(user?.uid, task)
      handleData()
      toast.success(<b>Task added successfuly</b>, { id })
      setIsLoading(false)
      setTask('')
      setIsModal(false)
    } catch (error) {
      console.log(error.message)
      toast.error(<b>{error.message}</b>, { id })
      setIsLoading(false)
    }
  }

  const handleClick = (e) => {
    if (e.target.classList.contains('modalBg')) {
      setIsModal(false)
    }
  }

  return (
    <div className='modalBg' onClick={handleClick}>
      <div className='modal'>
        <h3>Add to your list</h3>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setTask(e.target.value)}
            value={task}
            required
            type='text'
            placeholder='Eg: Buy milk'
          />
          <div className='btnDiv'>
            <button onClick={() => setIsModal(false)}>Cancel</button>
            <button disabled={isLoading} type='submit'>
              {isLoading ? 'Adding' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
