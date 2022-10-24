export default function TaskReducer(state, action) {
  switch (action.type) {
    case 'ADDING':
      return { ...state, addLoading: true }
    case 'TASKADDED':
      return { addLoading: false, task: '' }
    case 'TASKERROR':
      return { ...state, addLoading: false }
    case 'INPUTTASK':
      return { ...state, task: action.payload }
    default:
      return state
  }
}
