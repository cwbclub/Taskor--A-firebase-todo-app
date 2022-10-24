export default function AuthReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }
    case 'LOGOUT':
      return { ...state, user: null }
    case 'AUTHREADY':
      return { user: action.payload, authReady: true }
    default:
      return state
  }
}
