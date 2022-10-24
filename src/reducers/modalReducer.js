export default function ModalReducer(state, action) {
  switch (action.type) {
    case 'OFF':
      return { ...state, isModal: false }
    case 'CLICKEDIT':
      return {
        ...state,
        inputText: action.text,
        textId: action.id,
        isModal: true,
      }
    default:
      return state
  }
}
