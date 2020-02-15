import { combineReducers } from 'redux'
import socket from './socket.js'
import user from './user.js'

const reducer = combineReducers({
  socket,
  user
})

export default reducer;
