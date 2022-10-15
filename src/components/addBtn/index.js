import { FaPlus } from 'react-icons/fa'
import './addBtn.css'
export default function AddBtn({ setIsModal }) {
  return (
    <button onClick={() => setIsModal(true)} className='addBtn'>
      <FaPlus />
    </button>
  )
}
