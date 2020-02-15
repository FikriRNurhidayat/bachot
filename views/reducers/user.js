const initialState = {}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'SET_USER': {
      return action.payload
    }

    case 'SET_USER_ID': {
      return {
        ...state,
        id: action.payload
      }
    }

    default:
      return state
  }
}
