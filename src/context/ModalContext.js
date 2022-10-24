import { createContext, useContext, useReducer, useState } from 'react'
import ModalReducer from '../reducers/modalReducer'

const ModalContext = createContext(null)

export const useModal = () => useContext(ModalContext)

const INITIAL_STATE = {
  inputText: '',
  textId: '',
  isModal: false,
}
export default function ModalContextProvider({ children }) {
  const [isModal, setIsModal] = useState(false)
  const [state, dispatchModal] = useReducer(ModalReducer, INITIAL_STATE)
  const changeModal = (value) => {
    setIsModal(value)
  }
  return (
    <ModalContext.Provider value={{ ...state, dispatchModal }}>
      {children}
    </ModalContext.Provider>
  )
}
