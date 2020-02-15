const initialState = {}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'SET_WEBSOCKET':
      return action.payload

    case 'SET_ON_MESSAGE':
      return {
        ...state,
        onmessage: action.payload
      }

    case 'SET_SEND':
      return {
        ...state,
        send: action.payload
      }

    case 'SEND_MESSAGE':
      let message = JSON.stringify(action.payload)
      state.send(message)
      return state

    default:
      return state
  }
}
