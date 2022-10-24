import { useState } from 'react'
import toast from 'react-hot-toast'
import { updateTask } from '../../utils/firebase'
import './modal.css'

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
    <div className="modalBg" onClick={handleClick}>
      {console.log('Value', inputText)}
      <div className="modal">
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
            <button onClick={() => dispatchModal({ type: 'OFF' })}>
              Cancel
            </button>
            <button disabled={isLoading} type="submit">
              {isLoading ? 'Updating' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
