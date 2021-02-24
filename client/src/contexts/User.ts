import React from 'react'

const UserContext = React.createContext({
    loggedIn: false,
    setLoggedIn: (val: Boolean) => {}
  })

export default UserContext
