export const login = user => dispatch => {
  return new Promise(resolve => {
    localStorage.setItem('user', JSON.stringify(user))

    dispatch({
      type: 'SET_USER',
      payload: user
    })

    resolve()
  })
}

export const setUser = () => dispatch => {
  return new Promise((resolve, reject) => {
    try {
      let user = localStorage.getItem('user')
      user = JSON.parse(user) 

      if (!user) return reject('Unauthorized')

      dispatch({
        type: 'SET_USER',
        payload: user
      })

      resolve(user)
    } 

    catch(err) {
      reject(err)
    }
  })
}
