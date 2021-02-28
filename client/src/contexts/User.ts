import React from 'react'

const UserContext = React.createContext({
  loggedIn: false,
  setLoggedIn: (_val: boolean) => {},
})

export default UserContext
