const Socket = {
  connect: () => dispatch => {
    let socket = new WebSocket('ws://localhost:8000')
    dispatch({
      type: 'SET_WEBSOCKET',
      payload: socket
    })
  },

  sendMessage: msg => dispatch => {
    let user = localStorage.getItem('user')
    user = JSON.parse(user)

    dispatch({
      type: 'SEND_MESSAGE',
      payload: {
        type: 'message',
        data: {
          from: user,
          message: msg
        }
      }
    })
  }
}

export default Socket
